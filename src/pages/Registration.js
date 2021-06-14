import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from "../components/context/AuthContext";
import {Link, useHistory} from 'react-router-dom';


function Registration() {
    const {role}=useContext(AuthContext);
    const history = useHistory();


    console.log("Verlaten registration na 4 sec, naar login")
    setTimeout(() => {
        history.push("/login")
    }, 4000);


    return (
        <section>
            <h1>Registration pagina</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. eaque earum fugiat ipsum iure laboriosam odit
                perspiciatis provident quam quasi qui reprehenderit ullam vero. Consequatur ipsum magnam maiores modi
                nam praesentium quia? Adipisci corporis et illum minus, porro quae recusandae. Ab accusantium architecto
                autem deleniti dolor dolorem ea earum, error esse laborum minus molestias nam neque nisi numquam porro
                quasi quidem quis quo repellendus sit unde voluptas. Animi consequuntur dicta error expedita iusto
                officiis perspiciatis reiciendis ut voluptatum.</p>
            <h1>Registration</h1>

        </section>
    );
}

export default Registration;