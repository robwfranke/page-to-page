import React, {useState} from 'react';
import {useLocation, useHistory, NavLink} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios from 'axios';

import styles from "../Customer/Customer.module.css";

function CustomerOrderItem() {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const history = useHistory();

    const location = useLocation();

    const itemIndividual = location.state.item;


    console.log("itemIndividual: ", itemIndividual)


    const token = localStorage.getItem('token');

    const [changeStatus, setChangeStatus] = useState(false);

    function StartChange() {

        setChangeStatus(true);
        console.log("setChangeOrderItem true")
    }

    async function onSubmit(data) {


        if (changeStatus === true) {
            localStorage.setItem('loadOrderItem', true);
            console.log("data ", data)
            putStatus(data);
            setChangeStatus(false)
            history.push("/customerOrder")


        }


    }

    async function putStatus(data) {
        //
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  ordername: ",orderIndividual.ordername)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA  status: ",data.status)
        // console.log("AAAAAAAAAAAAAAAAAAAAAA token: ",token)
        const dataPut = {
            ordername: itemIndividual.itemname,
            quantity: data.quantity
        };


        try {
            console.log("PutStatus")
            const response = await axios.put(`http://localhost:8080/orders/update/${itemIndividual.itemname}`, dataPut, {
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
            <h1>CustomerOrderItem pagina</h1>
            <h3>item naam: {itemIndividual.itemname}</h3>
            <h3>quantity: {itemIndividual.quantity}</h3>
            <h3>jobs: {itemIndividual.jobsFromItem.length}</h3>

            <ul>
                {itemIndividual.jobsFromItem.map((job) => {
                    return <li key={job.id}>

                        <div>job id: {job.id}</div>
                        <div>jobname: {job.jobname}</div>
                        <div>afdeling: {job.department}</div>

                    </li>

                })}


            </ul>


            {/*<ul>*/}
            {/*    {orderIndividual.items.map((item) => {*/}
            {/*        return <li key={item.id}>*/}
            {/*            <div>Naam: {item.itemname} </div>*/}
            {/*            <div>Quantity: {item.quantity} </div>*/}
            {/*            <div>jobs: {item.jobsFromItem.length} </div>*/}
            {/*        </li>*/}
            {/*    })}*/}
            {/*</ul>*/}

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


                        <label htmlFor="username-field">
                            item naam:
                            <input
                                type="text"
                                defaultValue={itemIndividual.itemname}

                                placeholder=""
                                {...register("ordername", {required: true})}
                            />

                        </label>


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

export default CustomerOrderItem;