import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useContacts,clearFilter,
  setCurrentContactsPerPage
} from '../context/contact/ContactState';

// SetCurrentPage is name of two separate functions
const Pagination = () => {
  // CONTEXTAPI
  const [contactState, contactDispatch] = useContacts();
  const { contacts } = contactState;

  // managing state of local pages
  const [currentPage, SetCurrentPage] = useState(1);
  const [contactsPerPage] = useState(50);

  useEffect(() => {
    if (contacts !== null) {
      const dataArr = contacts;
      const indexOfLastContact = currentPage * contactsPerPage;
      const indexOfFirstContact = indexOfLastContact - contactsPerPage;
      const currentContactsOnPage =
        contacts !== null &&
        dataArr.slice(indexOfFirstContact, indexOfLastContact);
        // any change to state of current page triggers update of context api contactsPerPage
      setCurrentContactsPerPage(contactDispatch, currentContactsOnPage);
    }
  }, [contacts,currentPage]);

  const pageNumbers = [];
  // loop through contact list and push calculations into array to obtain correct number of pages
  const totalContacts = contacts !== null && contacts.length;

  for (let i = 1; i <= Math.ceil(totalContacts / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='navbar justify-center'>
      <ul className='flex justify-center items-center flex-wrap '>
        {pageNumbers.length > 0 &&
          pageNumbers.map((number) => (
            <li key={number} className='btn btn-group m-1'>
              <Link
                to='#'
                className='btn btn-xs m-1'
                onClick={() => {SetCurrentPage(number);clearFilter(contactDispatch);}}
                alt='paging'>
                {number}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
