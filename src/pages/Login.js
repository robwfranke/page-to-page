import React,{useState,useContext,useEffect} from 'react';

import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import axios from "axios";


import {AuthContext} from "../components/context/AuthContext";


function Login() {
    const history = useHistory();
    const {login} = useContext(AuthContext);
    console.log("{login}: ", login)


    console.log("Op Login page")

async function onSubmit(data){

        console.log("Login Page onSubmit, data:  ")  ;

        login();



    }




    //
    // console.log("Verlaten login na 4 sec, naar customer")
    // setTimeout(() => {
    //     history.push("/customer")
    // }, 4000);

    return (

        <>
        <section>
            <h1>Login pagina</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.  eaque earum fugiat ipsum iure laboriosam odit perspiciatis provident quam quasi qui reprehenderit ullam vero. Consequatur ipsum magnam maiores modi nam praesentium quia? Adipisci corporis et illum minus, porro quae recusandae. Ab accusantium architecto autem deleniti dolor dolorem ea earum, error esse laborum minus molestias nam neque nisi numquam porro quasi quidem quis quo repellendus sit unde voluptas. Animi consequuntur dicta error expedita iusto officiis perspiciatis reiciendis ut voluptatum.</p>
        </section>

            <button
                onClick={onSubmit}
                type="submit"
                className="form-button"
            >
                Inloggen
            </button>


</>



    );
}

export default Login;