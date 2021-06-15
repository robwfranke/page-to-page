import React, {useState} from 'react';
import {useLocation} from "react-router-dom";
import {useForm} from 'react-hook-form';
import styles from "../Registration/Registration.module.css";

function CustomerOrder() {

    const {register, handleSubmit, formState: {errors}} = useForm();

    const location = useLocation();
    const orderIndividual = location.state.order
    const oudeNaam = "Jan";
    const nieuweNaam="Klaas"




    console.log("orderIndividual: ", orderIndividual)


    console.log("Op CustomerOrder")

const [changeOrder,setChangeOrder]=useState(false);

    function StartChange(){

        setChangeOrder(true);
        console.log("setChangeOrder true")
    }
    async function onSubmit(data) {

        console.log("data ", data)
        setChangeOrder(false)

    }



    return (

        <section>
            <h1>CustomerOrder pagina</h1>
            <h2>{orderIndividual.ordername}</h2>
            <h3>status:  {orderIndividual.status}</h3>




            <ul>
                {orderIndividual.items.map((item) => {
                    return <li key={item.id}>
                        <div>Naam:   {item.itemname} </div>
                        <div>Quantity:   {item.quantity} </div>
                        <div>jobs:   {item.jobsFromItem.length} </div>
                    </li>
                })}
            </ul>

            <button
                type="text"
                onClick={StartChange}
            >
                Wijzig order
            </button>



                <>



                    {changeOrder &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={styles["registration-container"]}>


                        <label htmlFor="username-field">
                            OrderNaam:
                            <input
                                type="text"
                                defaultValue={orderIndividual.ordername}

                                // placeholder={oudeNaam}
                                {...register("ordername", {required: true})}
                            />
                            {errors.username && (
                                <span >Vul uw username in</span>

                            )}
                        </label>


                            <select
                                {...register("selectname", )}
                            >
                                <option value="grapefruit">Grapefruit</option>
                                <option value="lime">Lime</option>
                                <option selected value="coconut">Coconut</option>
                                <option value="mango">Mango</option>
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