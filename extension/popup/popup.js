const schemes = {
  'CDS': { totalMarks: 100, negativeFraction: 1/3, dynamic: true },
  'UPSC Prelims': { correct: 2, wrong: -0.66, dynamic: false },
  'AFCAT': { correct: 3, wrong: -1, dynamic: false },
  'SSC CGL': { correct: 2, wrong: -0.5, dynamic: false },
  'NEET': { correct: 4, wrong: -1, dynamic: false },
};

function calculateScores({ totalQuestions, correct, wrong, scheme, custom }) {
  const s = schemes[scheme];
  let marksPerCorrect, penaltyPerWrong;

  if (scheme === 'Custom') {
    marksPerCorrect = Number(custom.correct);
    penaltyPerWrong = Math.abs(Number(custom.wrong));
  } else if (s.dynamic) {
    marksPerCorrect = s.totalMarks / totalQuestions;
    penaltyPerWrong = marksPerCorrect * s.negativeFraction;
  } else {
    marksPerCorrect = s.correct;
    penaltyPerWrong = Math.abs(s.wrong);
  }

  const attempted = correct + wrong;
  const rawScore = correct * marksPerCorrect;
  const penalty = wrong * penaltyPerWrong;
  const finalScore = rawScore - penalty;
  const accuracy = attempted ? (correct / attempted) * 100 : 0;
  const attemptRate = totalQuestions ? (attempted / totalQuestions) * 100 : 0;

  return {
    marksPerCorrect: parseFloat(marksPerCorrect.toFixed(4)),
    rawScore: parseFloat(rawScore.toFixed(2)),
    penalty: parseFloat(penalty.toFixed(2)),
    finalScore: parseFloat(finalScore.toFixed(2)),
    accuracy: parseFloat(accuracy.toFixed(2)),
    attemptRate: parseFloat(attemptRate.toFixed(2)),
  };
}


function updateUI(data, scheme, custom) {
  const scores = calculateScores({ ...data, scheme, custom });

  document.getElementById('total').textContent = data.totalQuestions;
  document.getElementById('correct').textContent = data.correct;
  document.getElementById('wrong').textContent = data.wrong;
  document.getElementById('unattempted').textContent = data.unattempted;
  document.getElementById('raw-score').textContent = scores.rawScore;
  document.getElementById('penalty').textContent = `-${scores.penalty}`;
  document.getElementById('final-score').textContent = scores.finalScore;
  document.getElementById('accuracy').textContent = `${scores.accuracy}%`;
  document.getElementById('attempt-rate').textContent = `${scores.attemptRate}%`;

  return scores;
}

function loadHistory() {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    const historyList = document.getElementById('history-list');

    if (history.length === 0) {
      historyList.innerHTML = '<p class="no-history">No results saved yet</p>';
      return;
    }

    historyList.innerHTML = history
      .slice(0, 5)
      .map((item) => `
        <div class="history-item">
          <span class="scheme-tag">${item.examScheme}</span>
          <span class="score">${item.finalScore}</span>
          <span style="color:#64748b;font-size:11px">${new Date(item.savedAt).toLocaleDateString('en-IN')}</span>
        </div>
      `)
      .join('');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const schemeSelect = document.getElementById('scheme');
  const customSection = document.getElementById('custom-section');
  const saveBtn = document.getElementById('save-btn');
  const saveStatus = document.getElementById('save-status');
  const tokenInput = document.getElementById('token-input');
  const tokenSave = document.getElementById('token-save');

  let currentData = null;
  let currentScores = null;

  // Load saved token
  chrome.storage.local.get(['token'], (result) => {
    if (result.token) {
      tokenInput.value = '••••••••••••••••';
      saveBtn.classList.remove('hidden');
    }
  });

  // Save token
  tokenSave.addEventListener('click', () => {
    const token = tokenInput.value.trim();
    if (token && token !== '••••••••••••••••') {
      chrome.storage.local.set({ token }, () => {
        saveBtn.classList.remove('hidden');
        tokenInput.value = '••••••••••••••••';
        saveStatus.textContent = 'Connected ✓';
        setTimeout(() => saveStatus.textContent = '', 2000);
      });
    }
  });

  // Show/hide custom scheme inputs
  schemeSelect.addEventListener('change', () => {
    if (schemeSelect.value === 'Custom') {
      customSection.classList.remove('hidden');
    } else {
      customSection.classList.add('hidden');
    }
    if (currentData) {
      const custom = {
        correct: document.getElementById('custom-correct').value,
        wrong: document.getElementById('custom-wrong').value,
      };
      currentScores = updateUI(currentData, schemeSelect.value, custom);
    }
  });

  // Recalculate on custom input change
  document.getElementById('custom-correct').addEventListener('input', () => {
    if (currentData && schemeSelect.value === 'Custom') {
      const custom = {
        correct: document.getElementById('custom-correct').value,
        wrong: document.getElementById('custom-wrong').value,
      };
      currentScores = updateUI(currentData, schemeSelect.value, custom);
    }
  });

  document.getElementById('custom-wrong').addEventListener('input', () => {
    if (currentData && schemeSelect.value === 'Custom') {
      const custom = {
        correct: document.getElementById('custom-correct').value,
        wrong: document.getElementById('custom-wrong').value,
      };
      currentScores = updateUI(currentData, schemeSelect.value, custom);
    }
  });

  // Check for detected form data
  chrome.storage.local.get(['currentResult'], (result) => {
    if (result.currentResult) {
      currentData = result.currentResult;
      document.getElementById('not-detected').classList.add('hidden');
      document.getElementById('detected').classList.remove('hidden');
      currentScores = updateUI(currentData, schemeSelect.value, {});
    }
  });

  // Save to dashboard
  saveBtn.addEventListener('click', () => {
    chrome.storage.local.get(['token'], (result) => {
      if (!result.token) {
        saveStatus.textContent = 'No token. Paste token first.';
        return;
      }

      const payload = {
        examScheme: schemeSelect.value,
        totalQuestions: currentData.totalQuestions,
        correct: currentData.correct,
        wrong: currentData.wrong,
        unattempted: currentData.unattempted,
        ...currentScores,
      };

      // Save to local history
      chrome.storage.local.get(['history'], (histResult) => {
        const history = histResult.history || [];
        history.unshift({ ...payload, savedAt: new Date().toISOString() });
        chrome.storage.local.set({ history: history.slice(0, 20) });
        loadHistory();
      });

      // Save to backend
      chrome.runtime.sendMessage(
        { action: 'saveToBackend', result: payload, token: result.token },
        (response) => {
          if (response?.success) {
            saveStatus.textContent = '✓ Saved to dashboard';
          } else {
            saveStatus.textContent = '✓ Saved locally';
          }
          setTimeout(() => saveStatus.textContent = '', 3000);
        }
      );
    });
  });

  loadHistory();
});