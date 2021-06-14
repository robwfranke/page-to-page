import React from 'react';
import {Link, useHistory} from 'react-router-dom';


export default function Logout({}) {

    console.log("op logout page")
    localStorage.clear();



    const history = useHistory();
    history.push("/home")
    window.location.reload();
    return null;
}