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


    console.log("orderIndividual: ", orderIndividual)


    const loadOrder = localStorage.getItem('loadOrder')

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const userNameInCustomerOrder = decoded.sub;
    const [changeStatus, setChangeStatus] = useState(false);
    const[addItemStatus, setAddItemStatus]=useState(false);
    const [disableButton, setDisableButton] = useState(false);


    function StartChangeStatus() {

        setChangeStatus(true);
        setDisableButton(true);
        console.log("setChangeOrder true")
    }


    function cancelCustomerOrder() {

        history.push("/customer")

    }

    function cancelChangeStatusOrder() {
        setChangeStatus(false);
    }

    function canceladdItem() {
        setAddItemStatus(false);
    }


    function addItem() {
        setChangeStatus(false);
        setAddItemStatus(true);

    }


    async function onSubmit(data) {


        if (changeStatus === true) {
            // localStorage.setItem('loadOrder', true);

            console.log("data in onSubmit van changeStatus", data)
            putStatus(data);
            setChangeStatus(false)
            localStorage.setItem('loadOrder', true);
            history.push("/customer")
        }


        if (addItemStatus===true){

            console.log("data in onSubmit van addItem", data)

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
            console.log("dataPut, status: ", dataPut.status)
            console.log("dataPut, userNameInCustomerOrder: ", userNameInCustomerOrder)


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



            <fieldset className={styles["listItem-buttons"]}>

                <button
                    type="text"
                    onClick={StartChangeStatus}
                    className={styles["submit-button"]}
                >
                    Wijzig status
                </button>


                <button
                    type="text"
                    onClick={addItem}
                    className={styles["submit-button"]}
                >
                    Voeg item toe!
                </button>


                <button
                    onClick={cancelCustomerOrder}
                    className={styles["submit-button"]}
                >
                    Cancel
                </button>


                <>


                    {changeStatus &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles["registration-container"]}>


                            <p>Selecteer status</p>
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


                            <button
                                onClick={cancelChangeStatusOrder}
                                type="text"
                            >
                                Cancel
                            </button>


                        </fieldset>
                    </form>
                    }




                    {addItemStatus &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles["registration-container"]}>


                            <p>Voeg item toe</p>
                            <label htmlFor="itemname-field">
                                Username:
                                <input
                                    type="text"

                                    placeholder="vb. dwg 2021-001"
                                    {...register("itemname", {required: true})}
                                />
                                {errors.itemname && (
                                    <span className={styles["alert"]}>Vul uw itemname in</span>

                                )}
                            </label>



                            <label htmlFor="quantity-field">
                                Aantal:
                                <input
                                    type="integer"

                                    placeholder="vb. dwg 2021-001"
                                    {...register("quantity", {
                                        required: true,
                                    min:1
                                    })}
                                />
                                {errors.quantity && (
                                    <span className={styles["alert"]}>aantal groter dan nul</span>

                                )}
                            </label>












                            <button
                                type="submit"
                            >
                                Voeg toe!
                            </button>


                            <button
                                onClick={canceladdItem}
                                type="text"
                            >
                                Cancel
                            </button>


                        </fieldset>
                    </form>
                    }














                </>
            </fieldset>

            <h2>{orderIndividual.ordername}</h2>
            <h3>status: {orderIndividual.status}</h3>

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