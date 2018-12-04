'use strict';

const express = require('express');
const router = express.Router();
const Students = require('../models/student');

router.get('/all', async (req, res, next) => {
  try {
    const result = await Students.find({});

    if(result) res.send({students: result});

  } catch(err) {
    return res.status(404).send({ error: 'error pulling students data'})
  }
});

router.post('/add', async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      hobbies,
      age,
      major
    } = req.body;

    const emailTaken = await Students.find({ email });

    if (emailTaken) {
      return res.status(403).send({ error: 'email is already registered'})
    }

    const newStudent = new Student({
      email,
      firstName,
      lastName,
      hobbies,
      age,
      major
    });

    return newStudent.save()
      .then(() => res.send({ student: newStudent }));

  } catch(err) {
    return res.status(403).send({ error: 'something went wrong'})
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const {
      email,
      firstName,
      lastName,
      hobbies,
      age,
      major
    } = req.body;

    const query = { email };
    const update = {
      email,
      firstName,
      lastName,
      hobbies,
      age,
      major
    };
    const option = { new: true }

    const student = await Students.findOneAndUpdate(query, update, option);

    if (!student) {
      return res.status(404).send({ error: 'student not found'})
    }

    return res.send({student});

  } catch(err) {
    return res.status(403).send({ error: 'something went wrong'})
  }
});

router.put('/update', async (req, res, next) => {
  try {
    const { email } = req.body;
    const query = { email };
    const result = await Students.deleteOne(query);

    if (result===0) {
      return res.status(404).send({ error: 'student not found'})
    }

    return res.send({student: 'deleted'});

  } catch(err) {
    return res.status(403).send({ error: 'something went wrong'})
  }
});

module.exports = router;
