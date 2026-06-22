const express = require('express');
const Result = require('../models/Result');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all results for logged in user
router.get('/', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId }).sort({ takenAt: -1 });
    res.json({ success: true, data: results, message: 'Results fetched' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

// Save a new result
router.post('/', auth, async (req, res) => {
  try {
    const {
      examScheme, totalQuestions, correct, wrong,
      unattempted, rawScore, penalty, finalScore,
      accuracy, attemptRate
    } = req.body;

    const result = await Result.create({
      userId: req.userId,
      examScheme, totalQuestions, correct, wrong,
      unattempted, rawScore, penalty, finalScore,
      accuracy, attemptRate
    });

    res.status(201).json({ success: true, data: result, message: 'Result saved' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

// Get stats summary
router.get('/stats', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.userId });

    if (results.length === 0) {
      return res.json({
        success: true,
        data: {
          totalTests: 0,
          averageScore: 0,
          bestScore: 0,
          averageAccuracy: 0,
          mostUsedScheme: 'N/A'
        },
        message: 'No results yet'
      });
    }

    const totalTests = results.length;
    const averageScore = results.reduce((a, b) => a + b.finalScore, 0) / totalTests;
    const bestScore = Math.max(...results.map(r => r.finalScore));
    const averageAccuracy = results.reduce((a, b) => a + b.accuracy, 0) / totalTests;

    const schemeCounts = results.reduce((acc, r) => {
      acc[r.examScheme] = (acc[r.examScheme] || 0) + 1;
      return acc;
    }, {});
    const mostUsedScheme = Object.keys(schemeCounts).reduce((a, b) =>
      schemeCounts[a] > schemeCounts[b] ? a : b
    );

    res.json({
      success: true,
      data: {
        totalTests,
        averageScore: averageScore.toFixed(2),
        bestScore: bestScore.toFixed(2),
        averageAccuracy: averageAccuracy.toFixed(2),
        mostUsedScheme
      },
      message: 'Stats fetched'
    });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

// Delete a result
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Result.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!result) {
      return res.status(404).json({ success: false, data: null, message: 'Result not found' });
    }

    res.json({ success: true, data: null, message: 'Result deleted' });
  } catch (error) {
    res.status(500).json({ success: false, data: null, message: error.message });
  }
});

module.exports = router;