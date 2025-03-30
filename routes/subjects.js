const express = require("express");
const db = require('../utils/db_config').db;
let router = express.Router();

const get_all_subjects = async () => {
  try {
    return await db.any('SELECT * FROM "Subject"');
  } catch (err) {
    console.error(err);
    return false;
  }
}

const get_subject_by_id = async (id) => {
  try {
    return await db.one('SELECT * FROM "Subject" WHERE id = $1', id);
  } catch (err) {
    console.error(err);
    return false;
  }
}

router.get('/', async (req, res) => {
  const result = await get_all_subjects();
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(400).json();
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  if (id) {
    const result = await get_subject_by_id(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json();
    }
  }
  else {
    res.status(400).json();
  }
});

module.exports = router;