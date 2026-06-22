const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  examScheme: {
    type: String,
    required: true
  },
  totalQuestions: { type: Number, required: true },
  correct: { type: Number, required: true },
  wrong: { type: Number, required: true },
  unattempted: { type: Number, required: true },
  rawScore: { type: Number, required: true },
  penalty: { type: Number, required: true },
  finalScore: { type: Number, required: true },
  accuracy: { type: Number, required: true },
  attemptRate: { type: Number, required: true },
  takenAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);