import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";
// import {OrderContext} from "../../components/context/OrderContext";


function Customer() {

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const {user} = useContext(AuthContext);

    // const {status}=useContext(OrderContext);

    // console.log("status OrderContext", status)


    const token = localStorage.getItem('token');

    const loaded= localStorage.getItem('loadOrder')




    function getOrders() {
        console.log("getOrders")
        fetchData(token)
    }

    useEffect(() => {
        localStorage.setItem('loadOrder', false);

        fetchData(token)


    }, [loaded]);


    async function fetchData(jwtToken) {

        try {
            console.log("Customer Page")

            const response = await axios.get(`http://localhost:8080/orders/inlog`, {

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`,
                }
            })

            console.log("response CustomerOrderItem", response)
            // ?maak een array waar alle orders in staan
            // const testArray= response.data.
            console.log(response.data.length)

            setOrders(response.data)


        } catch (e) {
            console.log("Er is iets fout gegaan bij het ophalen")
            setError(true);
            setMessage("Er is iets fout gegaan bij het ophalen")


        }

    }


    return (
        <section>
            <h3>Customer pagina {user.username}</h3>
            <button onClick={getOrders}
            >
                Haal orders op
            </button>

            <div>

                <ul>
                    {orders.map((order) => {
                        return <li key={order.id}>
                            <NavLink
                                to={
                                    {
                                        pathname: `/customerOrder`,
                                        setTestje:{setTestje:true},
                                        state: {
                                            order: order,

                                        }
                                    }

                                }
                            >
                                <p>ordernaam:<span>{order.ordername}</span></p>

                            </NavLink>
                            <p>Omschrijving:<span>{order.description}</span></p>
                            <p>Status:<span>{order.status}</span></p>

                            {/* **************************************************************** */}
                            {/*per order mappen over de items (altijd minimaal 1 aanwezig*/}
                            <ul>
                                {order.items.map((item) => {
                                    return <li key={item.id}><span>itemname: </span>{item.itemname}
                                    </li>
                                })}
                            </ul>
                            {/* **************************************************************** */}
                        </li>
                    })}

                        </ul>
                        </div>


                        </section>
                        );
                    }

                    export default Customer;