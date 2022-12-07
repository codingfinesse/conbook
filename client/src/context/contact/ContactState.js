import { useReducer, useContext } from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';

import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CURRENT_CONTACTS_PER_PAGE,
  SORT_ORDER
} from '../types';

// create custom hook for contact context
export const useContacts = () => {
  const { state, dispatch } = useContext(ContactContext);
  return [state, dispatch];
};

// get contact list
export const getContactList = async (dispatch) => {
  try {
    const response = await fetch('api/contacts');
    const data = await response.json();
    dispatch({
      type: GET_CONTACTS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// add a new contact
export const addContact = async (dispatch, contact) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  };
  try {
    const response = await fetch('api/contacts', options);
    const data = await response.json();
    dispatch({
      type: ADD_CONTACT,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// edit an existing contact
export const editContact = async (dispatch, contact) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  };
  try {
    const response = await fetch(`api/contacts/${contact._id}`, options);
    const data = await response.json();
    dispatch({
      type: UPDATE_CONTACT,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// delete an existingcontact
export const deleteContact = async (dispatch, id) => {
  const options = {
    method: 'DELETE'
  };
  try {
    const response = await fetch(`api/contacts/${id}`, options);
    const data = await response.json();
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    });
  }
};

// set current contact state
export const setCurrent = async (dispatch, contact) => {
  dispatch({
    type: SET_CURRENT,
    payload: contact
  });
};

// search functionality
export const filterContacts = (dispatch, text) => {
  dispatch({
    type: FILTER_CONTACTS,
    payload: text
  });
};
export const clearFilter = (dispatch) => {
  dispatch({
    type: CLEAR_FILTER
  });
};

// sort contact list
export const sortOrder = (dispatch, contactsSorted) => {
  dispatch({
    type: SORT_ORDER,
    payload: contactsSorted
  });
};

// pagination
export const setCurrentContactsPerPage = async (
  dispatch,
  currentContactsOnPage
) => {
  dispatch({
    type: CURRENT_CONTACTS_PER_PAGE,
    payload: currentContactsOnPage
  });
};

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    contactsPerPage: null,
    filtered: null,
    error: null
  };
  // state engine
  const [state, dispatch] = useReducer(contactReducer, initialState);
  return (
    <ContactContext.Provider value={{ state: state, dispatch }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
