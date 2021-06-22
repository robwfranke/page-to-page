import React,{useState,useContext,useEffect} from 'react';
import {AuthContext} from "../../components/context/AuthContext";
import {Link, useHistory} from 'react-router-dom';
import styles from "./Profile.module.css"
import jwt_decode from "jwt-decode";


function Profile() {

    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = decoded.sub;

    const {role}=useContext(AuthContext);
    const {email}=useContext(AuthContext);
    const{street}=useContext(AuthContext);
    const{city}=useContext(AuthContext);
    const{postalcode}=useContext(AuthContext);
    const{telnumber}=useContext(AuthContext);
    // const {addresses}=useContext(AuthContext);


    console.log("Profile page role: ",role)
    console.log("Profile Page mail: ",email)
    console.log("Profile Page straat: ",street)
    console.log("Profile Page stad: ",city)
    console.log("Profile Page pc: ",postalcode)
    console.log("Profile Page tel: ",telnumber)
    console.log("user: ",user)



    const history = useHistory();

    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState(false);
    console.log(imagePreview)




    const handleImageChange = (e) => {
        setError(false)
        const selected = e.target.files[0];
        const allowed_types = ["image/png", "image/jpeg", "image/jpg"];
        if (selected && allowed_types.includes(selected.type)) {
            let reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selected);
        } else {
            setError(true);
        }
    };



    return (


        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    {error && <p className={styles.error}>Dit type file wordt niet ondersteund </p>}
                    <div
                        className={styles.imagePreview}
                        style={{background: imagePreview ? `url("${imagePreview}") no-repeat center/cover` : "#cae5d9"}}

                    >
                        {!imagePreview && (
                            <>
                                <p>Voeg een foto toe</p>
                                <button>
                                    <label htmlFor="fileUpload" className={styles.custumFileUpload}>
                                        Kies File
                                    </label>
                                </button>
                                <input type="file" id="fileUpload" onChange={handleImageChange}/>
                                <span>(jpg, jpeg or png)</span>
                            </>
                        )}
                    </div>
                    {imagePreview && (
                        <button onClick={() => setImagePreview(null)}>Delete foto</button>
                    )}
                </div>

                <div>
                    <h2>Gegevens:</h2>
                    <p><strong>UserName: </strong>{user}</p>

                    <p><strong>Email: </strong>{email}</p>
                    <p><strong>Stad: </strong>{city}</p>
                    <p><strong>Straat: </strong>{street}</p>

                    <p><strong>Post code: </strong>{postalcode}</p>
                    <p><strong>Tel. nummer </strong>{telnumber}</p>






                </div>
            </div>
        </>


    );
}

export default Profile;