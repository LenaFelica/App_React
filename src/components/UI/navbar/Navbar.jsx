import React from "react";
import { useContext } from "react";
import {Link} from "react-router-dom";
import { AuthContext } from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
   const {isAuth, setIsAuth} = useContext(AuthContext)
//* удаление запии из localStorage при выходе из приложения
   const logout = () => {
      setIsAuth(false);
      localStorage.removeItem('auth')
   }

   return (
      <div className="navbar">
      <MyButton style={{marginLeft: 5 }} onClick={logout}>
         Выйти
      </MyButton>   
      <div className="navbar__links">
          <MyButton><Link to="/about">О сайте</Link></MyButton>
          <MyButton><Link to="/posts">Посты</Link></MyButton>
      </div>
 </div>
   )
}
export default Navbar;