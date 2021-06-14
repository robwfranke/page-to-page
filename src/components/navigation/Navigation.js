import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import styles from "./Navigation.module.css"
import {AuthContext} from "../context/AuthContext";

function Navigation({isAuthUser, isAuthCustomer, isAuthAdmin, loggedIn}) {


    console.log("Navigation.js, ADMIN: ", isAuthAdmin)
    console.log("Navigation.js, COMPANY_USER: ", isAuthUser)
    console.log("Navigation.js, CUSTOMER: ", isAuthCustomer)
    console.log("Navigation.js, LoggedIn: ", loggedIn)


    const history = useHistory();
    const alles = useContext(AuthContext);


    console.log("NAVIGATIONPAGE ")


    return (
        <nav>
            <div className={styles["nav-container"]}>
                {(isAuthAdmin === true) && <div> Admin true</div>}
                {(isAuthUser === true) && <div> User true</div>}
                {(isAuthCustomer === true) && <div> customer true</div>}
                <ul>


                    <li>

                        <NavLink to="/" activeClassName={styles["active-link"]}>Home Page</NavLink>
                    </li>


                    {((isAuthCustomer === false) && (isAuthUser === false) && (isAuthAdmin === false)) &&
                    <li>
                        <NavLink to="/login" activeClassName={styles["active-link"]}>Login</NavLink>
                    </li>
                    }


                    {/*<li>*/}
                    {/*    <NavLink to="/registration" activeClassName={styles["active-link"]}>Registration</NavLink>*/}
                    {/*</li>*/}


                    {((isAuthAdmin === true)) &&

                    <li>
                        <NavLink to="/admin1" activeClassName={styles["active-link"]}>Admin</NavLink>
                    </li>
                    }




                    {( (isAuthUser === true) || (isAuthAdmin === true)) &&
                    <li>
                        <NavLink to="/companyUser" activeClassName={styles["active-link"]}>CompanyUser</NavLink>
                    </li>
                    }


                    {((isAuthCustomer === true||isAuthUser===true||isAuthAdmin===true)) &&


                    <li>
                        <NavLink to="/customer" activeClassName={styles["active-link"]}>Customer</NavLink>
                    </li>


                    }

                    {((isAuthCustomer === true) || (isAuthUser === true) || (isAuthAdmin === true)) &&
                    <li>
                        <NavLink to="/logout" activeClassName={styles["active-link"]}>Logout</NavLink>
                    </li>
                    }

                </ul>

            </div>


        </nav>
    )

}

export default Navigation;