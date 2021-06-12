import React, {createContext, useEffect, useState} from 'react';
import jwt_decode from 'jwt-decode';
import {useHistory} from 'react-router-dom';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {

    console.log("J<HGSDJDHJGVD")

    const history = useHistory();

    // **************************************************************
    // state voor de gebruikersdata, object voorgebruikersdata
    const [authState, setAuthState] = useState({
        // hier komt later nog een object bij
        user: null,
        status: 'pending',
        loginStatus: false,
        role: "",
    });
    // **************************************************************


    // ***************************  VOOR TESTEN *********************
    //customer1 passwrd customer
    // ***************************************************************

    //
    // // ***************************  fetchUserData *********************
    // async function fetchUserData(jwtToken) {
    //     const userId = "customer1"
    //
    //     const response = await axios.get(`http://localhost:8080/users/name/${userId}`, {
    //
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${jwtToken}`,
    //         }
    //     })
    //
    //     try {
    //
    //
    //     } catch (e) {
    //
    //
    //     }
    //
    // }

    // ***************************************************************

    //
    // // ***************************  useEffect *********************
    useEffect(() => {

        console.log("AuthContext, start useEffect")
        const jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjEiLCJleHAiOjE2MjQzNTY2MTQsImlhdCI6MTYyMzQ5MjYxNH0.Zbca8I4HBSFavseH-CbTbGs4c_L_mZRY8JqWy_dFYFE"


        if (jwtToken !== null && authState.user === null) {

            // fetchUserData(jwtToken);

        } else {

            console.log("geen token")

            setAuthState({
                user: null,
                status: 'done',
                role: "empty"

            });


        }

    }, [])
    // // ***************************************************************

    //
    // *************************** loginFunction *********************
    async function loginFunction(jwtToken) {

        jwtToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjEiLCJleHAiOjE2MjQzNTY2MTQsImlhdCI6MTYyMzQ5MjYxNH0.Zbca8I4HBSFavseH-CbTbGs4c_L_mZRY8JqWy_dFYFE"

        console.log("AuthContext, start loginFunction")

        // /jwt token in de local storage
        localStorage.setItem('token', jwtToken);

        // gebruikersdata ophalen
        // fetchUserData(jwtToken);

        console.log("AuthContext, net loginFunction uitgevoerd")

    }

    // ***************************************************************

    // *************************** const dat *********************
    const data = {
        ...authState,
        login: loginFunction,
        // logout: logoutFunction,
    }
    // ***************************************************************

    // *************************** RETURN *********************
    // geef const data mee aan de <AuthContext.Provider>
    return (

        <AuthContext.Provider value={data}>

            {authState.status === 'done'
                ? children
                : <p>Loading...</p>
            }
        </AuthContext.Provider>
    );
    // ***************************************************************


//    end of AuthContextProvider
}

export default AuthContextProvider;