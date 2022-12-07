import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  editContact,
  useContacts,
  setCurrent
} from '../context/contact/ContactState';

const Modal = ({ contactItem }) => {
  // CONTEXTAPI
  const [contactState, contactDispatch] = useContacts();
  const { contacts, current } = contactState;

  const [showModal, setShowModal] = useState(false);

  // place item in edit state via form
  const [updateInput, setUpdateInput] = useState('');

  //  monitor for any change (edit button is clicked) and use it to update local state
  useEffect(() => {
    if (current !== null) {
      setUpdateInput(current);
    } else {
      setUpdateInput(contactItem);
    }
  }, [current]);

  // destructuring local state to pass as values for form
  const { firstName, lastName, email, countryCode, phoneNumber } = updateInput;

  const onChange = (e) => {
    // view realtime changes in local state in ui
    setUpdateInput({ ...updateInput, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // sending changes to local state to CONTEXTAPI for database updates via backend
    editContact(contactDispatch, updateInput);
    setShowModal(false);
    toast.success('Contact Updated');
  };

  // editing process initial step 
  // set current state variable when edit button is clicked by user
  const openModalSetCurrent = () => {
    setShowModal(!showModal);
    setCurrent(contactDispatch, contactItem);
  };
  return (
    <>
      <button
        className='btn-xs m-1 btn-primary'
        onClick={openModalSetCurrent}>
        Edit
      </button>
      {contacts !== null && showModal ? (
        <>
          <div className='transition ease-in-out delay-1000'>
            <div className='  rounded w-[250px] h-[430px]  bg-primary-focus flex flex-col justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  '>
              <div onSubmit={onSubmit} className='flex flex-col items-center'>
                <h1 className='text-lg font-bold '>{`Edit ${firstName} ${lastName} `}</h1>
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
                <div className='flex flex-row-reverse'>
                  <button
                    onClick={onSubmit}
                    className='btn btn-xs btn-secondary m-2 sm:btn-md'>
                    Submit
                  </button>
                  <button
                    className='btn btn-xs bg-error m-2 sm:btn-md'
                    onClick={() => setShowModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
