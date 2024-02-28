import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/sessions">Sessions List</Link>
      <Link to="/add-session">Add Session</Link>
    </nav>
  );
}

export default Navbar;
