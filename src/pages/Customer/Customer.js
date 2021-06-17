import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";
import styles from "./Customer.module.css";
import {useForm} from 'react-hook-form';


// import {OrderContext} from "../../components/context/OrderContext";


function Customer() {

    const {register, handleSubmit, formState: {errors}} = useForm();


    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [addOrderStatus, setAddOrderStatus]=useState(false);

    const {user} = useContext(AuthContext);

    // const {status}=useContext(OrderContext);

    // console.log("status OrderContext", status)


    const token = localStorage.getItem('token');

    const loaded = localStorage.getItem('loadOrder')


    function getOrders() {
        console.log("getOrders")
        fetchData(token)
    }


    function addOrder(){
        setAddOrderStatus(true)


    }



    async function onSubmit(data) {
        console.log("CustomerOrder add:", data)

// setAddOrderStatus(false);
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



            <button onClick={addOrder}
            >
                Voeg order toe
            </button>


            {addOrderStatus &&
            <form onSubmit={handleSubmit(onSubmit)}>

                <fieldset className={styles["addOrder-container"]}>
                    <h3>Voeg nieuwe order toe</h3>


                    <label htmlFor="username-field">
                        Naam van de order:
                        <input
                            type="text"

                            placeholder="vb tekening nummer"
                            {...register("ordername", {required: true})}
                        />
                        {errors.username && (
                            <span className={styles["alert"]}>Vul order naam in</span>

                        )}
                    </label>




                    <label htmlFor="description">
                        Klant Omschrijving
                        <textarea

                            {...register("description", )}

                        />

                    </label>


                    <button
                        type="submit"
                        className={styles["submit-button"]}
                    >
                        Voeg toe!
                    </button>




                </fieldset>
            </form>
            }





        </section>







    );
}

export default Customer;