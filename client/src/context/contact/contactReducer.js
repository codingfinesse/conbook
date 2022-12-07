import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  CLEAR_CONTACTS,
  CURRENT_CONTACTS_PER_PAGE,
  SORT_ORDER
} from '../types';

const contactReducer = (state, action) => {
  switch (action.type) {
    // CRUD
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload
      };
    case ADD_CONTACT:
      // return current state
      // using spread operator to make a copy of the state since it's immutable
      // send payload data to update copy state in ui
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((item) =>
          item._id === action.payload._id ? action.payload : item
        )
      };
    case DELETE_CONTACT:
      // return all id not matching the action payload (id of clicked delete button)
      return {
        ...state,
        contacts: state.contacts.filter(
          (contactItem) => contactItem._id !== action.payload
        )
      };
    case SET_CURRENT:
      return {
        ...state,
        // return contact object from payload
        current: action.payload
      };
    case CURRENT_CONTACTS_PER_PAGE:
      return {
        ...state,
        contactsPerPage: action.payload
      };
    case FILTER_CONTACTS:
      return {
        ...state,
        // pass filtered state set to initial contacts to filter method
        filtered: state.contacts.filter(({ firstName, lastName, email }) => {
          const testString = `${firstName}${lastName}${email}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case SORT_ORDER:
      return {
        ...state,
        contacts: action.payload
      };
    case CONTACT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      throw new Error(`Unsupported type of: ${action.type} in contactReducer`);
  }
};

export default contactReducer;
