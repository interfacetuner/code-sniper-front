import { login, logout } from "../../services/firebase";
// import 'firebase/auth';


const Header = (props) => (
  <header class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-11">
    <h1>Welcome</h1>
    <ul>
      {props.user ? (
        <>
          <li>Welcome, {props.user.displayName}</li>
          <li>
            <img src={props.user.photoURL} alt={props.user.displayName} />
          </li>

          <li class="bg-blue-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 ..." onClick={logout}>
            Logout
          </li>

        </>
      ) : (
        <li className="auth-link" onClick={login}>
          Login
        </li>
      )}
    </ul>
  </header>
);

export default Header;
