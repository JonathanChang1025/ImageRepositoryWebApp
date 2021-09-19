import React, {useState} from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo.svg";
import { firebase, auth} from "./service/firebase";
import "firebase/compat/auth";


const Header = () => {

    const auth = getAuth();

    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    firebase.auth().onAuthStateChanged((user)=>{
        console.log("state changed");
        if (user) {
            return setIsUserSignedIn(true);
        } else {
            return setIsUserSignedIn(false);
        }
    });    

    const signInWithFirebase = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        
        firebase.auth().signInWithPopup(provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    const signOut = () => {
        firebase.auth().signOut();
    }

    return (
        <Navbar
            bg="myRed"
            variant="dark"
            sticky="top">
            <Navbar.Brand>
                <img src={logo} width="40px" height="40px"/>
                Image Repository
            </Navbar.Brand>
            <Nav>
                <Nav.Link className="ms-auto" href="./">Home</Nav.Link>
                <Nav.Link className="ms-auto" href="./myimages">My Images</Nav.Link>
                <Nav.Link className="ms-auto" href="./uploadimage">Upload</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                {isUserSignedIn
                ? <Nav>
                    <Nav.Link className="ms-auto" onClick={ signOut }>Welcome</Nav.Link>
                    <Nav.Link className="ms-auto" onClick={ signOut }>Sign Out</Nav.Link>
                    </Nav>
                : <Nav.Link className="ms-auto" onClick={ signInWithFirebase }>Sign In</Nav.Link>
                }
            </Nav>
        </Navbar>
    )
};

export default Header;