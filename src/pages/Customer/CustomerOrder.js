import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';

import styles from "../Customer/Customer.module.css";

function CustomerOrder() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const location = useLocation();
    const orderIndividual = location.state.order
    const token = localStorage.getItem('token');

    const [changeStatus, setChangeStatus] = useState(false);

    function StartChange() {

        setChangeStatus(true);
        console.log("setChangeOrder true")
    }

    async function onSubmit(data) {


        if (changeStatus === true) {
            console.log("data ", data)
            putStatus(data);
            setChangeStatus(false)


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
            const response = await axios.put(`http://localhost:8080/orders/update/${orderIndividual.ordername}`, dataPut, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, /*BACK TICK!!!!!*/
                }
            })


        } catch (e) {
            console.log("PutStatus fout gegaan")

        }


    }


    return (

        <section>
            <h1>CustomerOrder pagina</h1>
            <h2>{orderIndividual.ordername}</h2>
            <h3>status: {orderIndividual.status}</h3>


            <ul>
                {orderIndividual.items.map((item) => {
                    return <li key={item.id}>
                        <div>Naam: {item.itemname} </div>
                        <div>Quantity: {item.quantity} </div>
                        <div>jobs: {item.jobsFromItem.length} </div>
                    </li>
                })}
            </ul>

            <button
                type="text"
                onClick={StartChange}
            >
                Wijzig status
            </button>


            <>


                {changeStatus &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles["registration-container"]}>


                        {/*<label htmlFor="username-field">*/}
                        {/*    OrderNaam:*/}
                        {/*    <input*/}
                        {/*        type="text"*/}
                        {/*        // defaultValue={orderIndividual.ordername}*/}

                        {/*        placeholder=""*/}
                        {/*        {...register("ordername", {required: true})}*/}
                        {/*    />*/}
                        {/*    /!*{errors.username && (*!/*/}
                        {/*    /!*    <span >Vul uw username in</span>*!/*/}

                        {/*    /!*)}*!/*/}
                        {/*</label>*/}

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


        </section>
    );
};

export default CustomerOrder;