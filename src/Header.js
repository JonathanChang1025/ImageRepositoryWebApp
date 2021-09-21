import React, {useState} from "react";
import { Route, Redirect, useHistory} from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo.svg";
import { firebase, auth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence} from "./service/firebase";
import "firebase/compat/auth";
import HomePage from "./HomePage";


const Header = () => {
    const history = useHistory();

    const [displayName, setDisplayName] = useState("");

    auth.onAuthStateChanged((user)=>{
        if (user) {
            setDisplayName(user.displayName);
        } else {
            setDisplayName("");
        }
    });    

    const signInWithFirebase = () => {
        firebase.auth().setPersistence("session");
        var provider = new firebase.auth.GoogleAuthProvider();
        
        auth.signInWithPopup(provider)
        .then((re)=>{
            console.log(re);
        })
        .catch((err)=>{
            console.log(err);
        })
      
    }

    const signOut = () => {
        auth.signOut();
        history.push("/");
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
                {displayName
                ?
                <Nav>
                    <Nav.Link className="ms-auto" href="./myimages">My Images</Nav.Link>
                    <Nav.Link className="ms-auto" href="./uploadimage">Upload</Nav.Link>
                </Nav>
                :<></>
                }
            </Nav>
            <Nav className="ml-auto">
                {
                displayName
                ?
                <Nav>
                    <Nav.Link className="ms-auto">Welcome  {displayName}</Nav.Link>
                    <Nav.Link className="ms-auto" onClick={ signOut }>Sign Out</Nav.Link>
                </Nav>
                :
                <Nav.Link className="ms-auto" onClick={ signInWithFirebase }>Sign In</Nav.Link>
                }
            </Nav>
        </Navbar>
    )
};

export default Header;