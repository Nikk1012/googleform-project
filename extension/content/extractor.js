
function extractFormData() {
  try {
    // Extract total score from .tV8Uvb
    const scoreContainer = document.querySelector('.tV8Uvb');
    let correct = null;
    let totalPoints = null;

    if (scoreContainer) {
      const text = scoreContainer.innerText;
      const match = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        correct = parseInt(match[1]);
        totalPoints = parseInt(match[2]);
      }
    }

    if (correct === null) {
      const allText = document.body.innerText;
      const matches = [...allText.matchAll(/(\d+)\s+of\s+(\d+)\s+points?/gi)];
      if (matches.length > 0) {
        const best = matches.reduce((a, b) =>
          parseInt(a[2]) > parseInt(b[2]) ? a : b
        );
        correct = parseInt(best[1]);
        totalPoints = parseInt(best[2]);
      }
    }

    if (correct === null || totalPoints === null) return null;

    // Count correct, wrong, skipped using data-item-id
    const correctContainers = new Set();
    document.querySelectorAll('[aria-label="Correct"]').forEach(el => {
      let parent = el.parentElement;
      for (let i = 0; i < 8; i++) {
        if (!parent) break;
        if (parent.getAttribute('data-item-id')) {
          correctContainers.add(parent.getAttribute('data-item-id'));
          break;
        }
        parent = parent.parentElement;
      }
    });

    // Separate wrong vs skipped using selected answer detection
    let wrong = 0;
    let skipped = 0;
    const seen = new Set();

    document.querySelectorAll('[aria-label="Incorrect"]').forEach(el => {
      let parent = el.parentElement;
      for (let i = 0; i < 8; i++) {
        if (!parent) break;
        if (parent.getAttribute('data-item-id')) {
          const id = parent.getAttribute('data-item-id');
          if (!seen.has(id)) {
            seen.add(id);
            const selected = parent.querySelector(
              '[aria-checked="true"], [class*="checked"], [class*="selected"]'
            );
            if (selected) wrong++;
            else skipped++;
          }
          break;
        }
        parent = parent.parentElement;
      }
    });

    // Use DOM correct count if reliable, fallback to header score
    const domCorrect = correctContainers.size;
    const finalCorrect = (domCorrect > 0 && domCorrect <= totalPoints)
      ? domCorrect
      : correct;

    return {
      totalQuestions: totalPoints,
      correct: finalCorrect,
      wrong,
      unattempted: skipped,
      url: window.location.href,
      detectedAt: new Date().toISOString(),
    };
  } catch (err) {
    return null;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractData') {
    const data = extractFormData();
    sendResponse({ success: !!data, data });
  }
  return true;
});

const data = extractFormData();
if (data) {
  chrome.storage.local.set({ currentResult: data });
}