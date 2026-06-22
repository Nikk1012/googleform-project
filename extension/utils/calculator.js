const schemes = {
  'CDS': { 
    totalMarks: 100, 
    negativeFraction: 1/3,
    dynamic: true
  },
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
    // CDS: total marks always 100, questions vary (100 or 120)
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