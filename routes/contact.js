const express = require('express');
const router = express.Router();
const { check, validationResults } = require('express-validator');
const { copyFile } = require('fs');

// mongoose schema
const Contact = require('../models/Contact');

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    req.statusCode(500).send('Server Error: GET Request');
  }
});

// adding a new contact
router.post('/', async (req, res) => {
  // destructuring request
  const { id, firstName, lastName, email, phoneNumber, countryCode } = req.body;

  // create a new contact object using mongoose schema and destructuring parameters
  try {
    const newContact = new Contact({
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      countryCode
    });
    // update db and return new contact as response in json format
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error: POST Response');
  }
});

// edit an existing contact
router.put('/:id', async (req, res) => {
  const { id, firstName, lastName, email, phoneNumber, countryCode } = req.body;

  // Destructure a request body from req.body
  contactFields = {};
  if (id) contactFields.id = id;
  if (firstName) contactFields.firstName = firstName;
  if (lastName) contactFields.lastName = lastName;
  if (email) contactFields.email = email;
  if (phoneNumber) contactFields.phoneNumber = phoneNumber;
  if (countryCode) contactFields.countryCode = countryCode;

  try {
    // match db id with params id from route
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    // mongodb $set operator replaces field with specified value
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    res.json(contact);
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server Error: PUT Response');
  }
});

// delete an existing contact
router.delete('/:id', async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact Not Found' });

    // confirm deletion
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact Deleted' });
  } catch (err) {
    console.error(err.msg);
    res.status(500).send('Server Error: DELETE Response');
  }
});

module.exports = router;
