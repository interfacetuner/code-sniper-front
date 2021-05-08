import { login, logout } from "../../services/firebase";
// import 'firebase/auth';


const Header = (props) => (
  <header class="flex items-center justify-between flex-wrap bg-teal p-6">
    <h1 class="font-semibold text-xl tracking-tight">Code-Sniper</h1>
    <ul>
      {props.user ? (
        <>
          <li class="flex items-center flex-no-shrink text-white mr-6">Welcome, {props.user.displayName}</li>
          <li class="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54">
            <img src={props.user.photoURL} alt={props.user.displayName} />
          </li>
          
          <li class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>
            Logout
          </li>
         
          

        </>
      ) : (
        <li class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={login}>
          Login
        </li>
      )}
    </ul>
  </header>
);

export default Header;
