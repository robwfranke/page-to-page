import React, {useState} from 'react';
import {useLocation, useHistory, NavLink} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';

import styles from "../Customer/Customer.module.css";
import jwt_decode from "jwt-decode";

function CustomerOrder() {





    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();

    const location = useLocation();

    const orderIndividual = location.state.order;


    console.log("orderIndividual: ",orderIndividual)



    const loadOrder = localStorage.getItem('loadOrder')

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userNameInCustomerOrder = decoded.sub;




    const [changeStatus, setChangeStatus] = useState(false);

    function StartChange() {

        setChangeStatus(true);
        console.log("setChangeOrder true")
    }


    function cancel1() {
        // setLoadOrderState(true);
        // setAddOrderStatus(false)
        history.push("/customer")

    }



    async function onSubmit(data) {


        if (changeStatus === true) {
            // localStorage.setItem('loadOrder', true);

            console.log("data in onSubmit", data)
            putStatus(data);
            setChangeStatus(false)
            localStorage.setItem('loadOrder', true);
            history.push("/customer")


        }


    }

    async function putStatus(data) {
        //
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  ordername: ",orderIndividual.ordername)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  status: ",data.status)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA token: ",token)
        const dataPut = {
            ordername: orderIndividual.ordername,
            status: data.status
        };


        try {
            console.log("PutStatus")
            console.log("dataPut, ordername: ", dataPut.ordername)
            console.log("dataPut, status: ",dataPut.status)
            console.log("dataPut, userNameInCustomerOrder: ",userNameInCustomerOrder)



            const response = await axios.put(`http://localhost:8080/orders/update/${orderIndividual.ordername}`, dataPut, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })



        } catch (e) {
            console.log("PutStatus fout gegaan", e.response)
            console.log("PutStatus fout gegaan", e.response.status)

        }


    }


    return (

        <section>
            <h1>CustomerOrder pagina</h1>
            <h2>{orderIndividual.ordername}</h2>
            <h3>status: {orderIndividual.status}</h3>


            <fieldset className={styles["listItem-buttons"]}>

            <button
                type="text"
                onClick={StartChange}
            >
                Wijzig status
            </button>


                <button
                    onClick={cancel1}
                    className={styles["submit-button"]}
                >
                    Cancel
                </button>




            <>


                {changeStatus &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles["registration-container"]}>




                        <p>Status</p>
                        <select
                            {...register("status",)}
                        >
                            <option value="open">open</option>
                            <option value="pending">pending</option>
                            <option value="finished">finished</option>
                        </select>


                        <button
                            type="submit"
                        >
                            Wijzig!
                        </button>


                    </fieldset>
                </form>
                }


            </>
            </fieldset>


            <ul>
                {orderIndividual.items.map((item) => {
                    return <li key={item.id}>



                        <NavLink
                            to={
                                {
                                    pathname: `/customerOrderItem`,
                                    state: {
                                        item: item,

                                    }
                                }

                            }
                        >
                            <p>item naam:<span>{item.itemname}</span></p>

                        </NavLink>




                        {/*<div>Naam: {item.itemname} </div>*/}
                        <div>Quantity: {item.quantity} </div>
                        <div>jobs: {item.jobsFromItem.length} </div>
                    </li>
                })}
            </ul>







        </section>
    );
};

export default CustomerOrder;