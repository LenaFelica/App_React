import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router";


const AppRouter = () => {

   const {isAuth, setIsAuth} = useContext(AuthContext);

   return(
      isAuth
         ?  
      <Routes>
         {privateRoutes.map((route, index) => 
            <Route 
               key={index}
               path={route.path}
               element={route.element}
               exact={route.exact}
            />
         )} 
            <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
         : 
      <Routes>
         {publicRoutes.map((route, index) =>
            <Route 
               key={index}
               path={route.path} 
               element={route.element} 
               exact={route.exact} 
            />
            )} 
            <Route path="*" element={<Navigate to="/login" replace />} />
   
      </Routes>

   )
}

export default AppRouter;