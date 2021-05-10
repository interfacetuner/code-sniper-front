import { login, logout } from "../../services/firebase";



const Header = (props) => (
  <header class="flex items-center justify-between flex-wrap p-4 shadow-lg bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 ...">
    <h1 class="font-bold text-purple-800 text-4xl tracking-tight font-press-start">Code-Sniper</h1>
    <ul>
      {props.user ? (
        <>
          <li class="flex items-center flex-no-shrink text-white mr-6">Welcome, {props.user.displayName}</li>
          <li class="h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54">
            <img src={props.user.photoURL} alt={props.user.displayName} />
          </li>
          
          <li class="w-20 text-white font-bold py-2 px-4 rounded bg-purple-500 hover:bg-red-700 ..." onClick={logout}>
            Logout
          </li>
         
          

        </>
      ) : (
        <li class="w-20 text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-red-700 ..." onClick={login}>
          Login
        </li>
      )}
    </ul>
  </header>
);

export default Header;
