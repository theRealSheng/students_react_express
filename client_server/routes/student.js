'user strict';

const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/all', async (req, res) => {
  try {
    const students = await Student.find({})
    return res.send({ students })

  } catch(err) {
    console.log(err);
    return res.status(404).send({message: 'failed to load students'})
  }
});

router.delete('/delete-student/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Student.deleteOne({email});

    if (result.ok === 1){
      return res.send({ email });
    }

  } catch(err) {
    console.log(err);
    return res.status(404).send({message: 'failed to load students'})
  }
});

router.post('/create', async (req, res) => {
  try {
    console.log(req.body);
    const { email, firstName, lastName, hobbies, photo, age, major } = req.body;

    const emailTaken = await Student.findOne({email});

    if (emailTaken) {
      console.log(emailTaken)
      return res.status(403).send({message: 'email already registered'})
    }

    const newStudent = new Student({
      email, firstName, lastName, hobbies, photo, age, major
    })

    const student = await newStudent.save();
    if (student) {
      return res.send({student});
    } else {
      return res.status(403).send({message: 'something went wrong, please try again'})
    }

  } catch(err) {
    console.log(err);
    return res.status(404).send({message: 'failed to load students'})
  }
});

router.put('/edit', async (req, res) => {
  try {
    const { email, firstName, lastName, hobbies, photo, age, major } = req.body;
    const query = { email };
    const update = { firstName, lastName, hobbies, photo, age, major };
    const options = { new: true };
    const updatedStudent = await Student.findOneAndUpdate(query, update, options);

    if (updatedStudent) {
      return res.send({ student: updatedStudent });
    }

  } catch(err) {
    console.log(err);
    return res.status(404).send({message: 'failed to update student'})
  }
});


module.exports = router;
