import React from "react";
import { firebase } from "./service/firebase";
import "firebase/compat/auth";

const SignIn = () => {

    const SignInWithFirebase = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    return(
        <div>
            <h1>Sign in Page</h1>
            <p>This is the sign in page</p>
            <button onClick={ SignInWithFirebase }>Sign in with Google</button>
        </div>
    )

};

export default SignIn;