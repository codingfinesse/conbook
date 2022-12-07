import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  addContact,
  clearCurrent,
  useContacts
} from '../context/contact/ContactState';
const initialContact = {
  id: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  countryCode: ''
};
const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();
  const { current, contacts } = contactState;

  // set hook values
  const [contact, setContact] = useState(initialContact);

  // destructuring contact object for data to use with form below
  const { firstName, lastName, email, phoneNumber, countryCode } = contact;

  // set max id to add as correct id number for new contact id
  const idMax = contacts !== null && contacts.map((user) => user.id).sort((a, b) => a - b)[contacts.length - 1] + 1;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value, id: idMax });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // adding a contact to current state
    if (contact !== initialContact) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    }
    toast.success('Contact Added');
    // clearAll()
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className='flex flex-col items-center w-screen'>
        <h2 className='text-primary m-2'>
        </h2>
        <input
          className='p-2 m-2'
          type='text'
          placeholder='First Name'
          name='firstName'
          value={firstName}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='text'
          placeholder='Last Name'
          name='lastName'
          value={lastName}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={onChange}
        />

        <input
          className='p-2 m-2'
          type='tel'
          placeholder='123-456-7890'
          name='phoneNumber'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
          value={phoneNumber}
          onChange={onChange}
        />
        <input
          className='p-2 m-2'
          type='text'
          placeholder='Country Code'
          name='countryCode'
          value={countryCode}
          onChange={onChange}
        />
        <button className='btn btn-xs btn-accent m-2 sm:btn-md'>Submit</button>
      </form>
    </>
  );
};

export default ContactForm;
