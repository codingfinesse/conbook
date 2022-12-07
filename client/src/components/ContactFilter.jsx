import { useState, useEffect, Fragment } from 'react';
import ContactDetails from './ContactDetails';
import ContactList from './ContactList';
import {
  useContacts,
  getContactList,
  sortOrder
} from '../context/contact/ContactState';

const ContactFilter = () => {
  // CONTEXTAPI
  // custom hooks
  const [contactState, contactDispatch] = useContacts();
  // destructuring setter for custom hooks
  const { contacts } = contactState;

  // local state for sorting
  const [isAscending, setIsAscending] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [isCountryCode, setIsCountryCode] = useState(false);

  useEffect(() => {
    if (contacts === null) {
      getContactList(contactDispatch);
    }

    sortOrder(contactDispatch, filterOrders());

    return () => {};
  }, [contactDispatch, isAscending, isDescending, isCountryCode]);

  // sorting logic

  const filterOrders = () => {
    const dataArr = contacts;

    // ascending
    if (isAscending) {
      const searchAscArr = dataArr.sort((a, b) =>
        a.lastName > b.lastName ? 1 : b.lastName > a.lastName ? -1 : 0
      );

      return searchAscArr;
    }

    // descending
    if (isDescending) {
      const searchDescArr = dataArr.sort((a, b) =>
        a.lastName < b.lastName ? 1 : b.lastName < a.lastName ? -1 : 0
      );
      return searchDescArr;
    }

    // country code logic
    if (isCountryCode) {
      const searchCountryCodeArr = dataArr.sort((a, b) =>
        a.countryCode > b.countryCode
          ? 1
          : b.countryCode > a.countryCode
          ? -1
          : 0
      );
      return searchCountryCodeArr;
    }
    return contacts;
  };
  
  return (
    <Fragment>
      <div>
        <h1 className='text-sm text-center leading-relaxed m-3'>
          Search by first name, last name, or email.
        </h1>
        <div className='dropdown dropdown-hover'>
          <label tabIndex='0' className='btn-xs btn-secondary btn m-1'>
            Sort
          </label>
          <ul
            tabIndex='0'
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
            <li>
              <button
                onClick={(e) => {
                  setIsAscending(true);
                  setIsDescending(false);
                  setIsCountryCode(false);
                }}>
                Last Name A-Z
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setIsDescending(true);
                  setIsAscending(false);
                  setIsCountryCode(false);
                }}>
                Last Name Z-A
              </button>
            </li>
            <li>
              <button
                onClick={(e) => {
                  setIsCountryCode(true);
                  setIsDescending(false);
                  setIsAscending(false);
                }}>
                Country Code
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center m-3 sm:flex-wrap sm:flex-row '>
        {isAscending
          ? contacts.map((contactItem) => (
              <ContactDetails contactItem={contactItem} key={contactItem._id} />
            ))
          : isDescending
          ? contacts.map((contactItem) => (
              <ContactDetails key={contactItem._id} contactItem={contactItem} />
            ))
          : isCountryCode
          ? contacts.map((contactItem) => (
              <ContactDetails key={contactItem._id} contactItem={contactItem} />
            ))
          :  <ContactList />}
       
      </div>
    </Fragment>
  );
};

export default ContactFilter;
