import React, {useContext, useState} from 'react';

import './App.css';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Navigation from "./components/navigation/Navigation";
import Login from "./pages/Login"
import Logout from "./pages/Logout";
import Registration from "./pages/Registration";
import Admin1 from "./pages/Admin1";
import CompanyUser from "./pages/CompanyUser";
import Customer from "./pages/Customer";
import {AuthContext} from "./components/context/AuthContext";


function App() {
    const {role} = useContext(AuthContext);
    console.log("Navigation, role uit authcontext: ", role)


  return (
     <div>
         <Navigation/>


       <Switch>

         <Route exact path="/">
           <Home/>
         </Route>



           <Route exact path="/login">
               <Login/>
           </Route>

           <Route exact path="/logout">
               <Logout/>
           </Route>


           <Route exact path="/registration">
               <Registration/>
           </Route>

           <Route exact path="/admin1">
               <Admin1/>
           </Route>

           <Route exact path="/companyUser">
               <CompanyUser/>
           </Route>


           <Route exact path="/customer">
               <Customer/>
           </Route>


       </Switch>


















     </div>




)}

export default App;
