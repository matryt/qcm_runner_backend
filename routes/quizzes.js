const db = require('../utils/db_config').db;
const express = require('express');
const router = express.Router();

const get_all_quizzes = async () => {
  try {
    return await db.query('SELECT * FROM "Quiz"');
  }
  catch (err) {
    console.error(err);
    return false;
  }
}

const get_quizzes_by_subject = async (subject_id) => {
  try {
    return await db.any('SELECT * FROM "Quiz" WHERE subject_id = $1', [subject_id]);
  }
  catch (err) {
    console.error(err);
    return false;
  }
}

router.get('/', async (req, res) => {
  const quizzes = await get_all_quizzes();
  if (!quizzes) {
    res.send(400);
    return;
  }
  res.status(200).json(quizzes);
});

router.get('/:subject', async (req, res) => {
  const quizzes = await get_quizzes_by_subject(req.params.subject);
  if (!quizzes) {
    res.send(400);
    return;
  }
  res.status(200).json(quizzes);
});

module.exports = router;