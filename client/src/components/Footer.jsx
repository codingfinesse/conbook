import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <div className='flex justify-center m-3 w-full'>
      <div className='btn-group'>
        <Link to='/'>
          <button className='btn btn-xs m-2'>Home</button>
        </Link>
        <Link to='/contact-list'>
          <button className='btn btn-xs m-2 btn-active'>Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
