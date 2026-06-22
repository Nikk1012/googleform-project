export const schemes = {
  CDS: { correct: 1, wrong: -0.33 },
  'UPSC Prelims': { correct: 2, wrong: -0.66 },
  AFCAT: { correct: 3, wrong: -1 },
  'SSC CGL': { correct: 2, wrong: -0.5 },
  NEET: { correct: 4, wrong: -1 },
};

export const calculateScores = ({ totalQuestions, correct, wrong, scheme, custom }) => {
  const attempted = correct + wrong;
  const unattempted = totalQuestions - attempted;
  const correctValue = scheme === 'Custom' ? Number(custom.correct) : schemes[scheme]?.correct || 0;
  const wrongValue = scheme === 'Custom' ? Number(custom.wrong) : schemes[scheme]?.wrong || 0;
  const rawScore = correct * correctValue;
  const penalty = wrong * Math.abs(wrongValue);
  const finalScore = rawScore - penalty;
  const accuracy = attempted ? (correct / attempted) * 100 : 0;
  const attemptRate = totalQuestions ? (attempted / totalQuestions) * 100 : 0;

  return {
    rawScore: parseFloat(rawScore.toFixed(2)),
    penalty: parseFloat(penalty.toFixed(2)),
    finalScore: parseFloat(finalScore.toFixed(2)),
    accuracy: parseFloat(accuracy.toFixed(2)),
    attemptRate: parseFloat(attemptRate.toFixed(2)),
    unattempted,
    attempted,
  };
};