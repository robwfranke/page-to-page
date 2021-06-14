import React from 'react';
import {Link, useParams, useLocation} from "react-router-dom";
import {AuthContext} from "../../components/context/AuthContext";

function CustomerOrder() {

    const location = useLocation();
    const orderIndividual = location.state.order
    console.log("orderIndividual: ", orderIndividual)


    console.log("Op CustomerOrder")


    const {idURL} = useParams();


    return (

        <section>
            <h1>CustomerOrder pagina</h1>
            <h2>{orderIndividual.ordername}</h2>


            <ul>
                {orderIndividual.items.map((item) => {
                    return <li key={item.id}>
                        <div>Naam:   {item.itemname} </div>
                        <div>Quantity:   {item.quantity} </div>
                        <div>jobs:   {item.jobsFromItem.length} </div>
                    </li>
                })}
            </ul>

            {/*<ul>*/}
            {/*    {orderIndividual.items.jobsFromItem.map((job) => {*/}
            {/*        return <li key={job.id}><span>itemname: </span>{job.jobname}*/}
            {/*        </li>*/}
            {/*    })}*/}
            {/*</ul>*/}


        </section>
    );
}

export default CustomerOrder;