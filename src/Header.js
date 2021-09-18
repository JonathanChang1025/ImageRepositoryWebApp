import React from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./logo.svg";
import firebase from "firebase/app";
import auth from "./firebase";


const Header = () => {
    
    const auth = getAuth();
    const user = auth.currentUser;

    return(
        <Navbar
            bg="myRed"
            variant="dark"
            sticky="top">
            <Navbar.Brand>
                <img src={logo} width="40px" height="40px"/>
                Logo
            </Navbar.Brand>
            <Nav>
                <Nav.Link className="ms-auto" href="./">Home</Nav.Link>
                <Nav.Link className="ms-auto" href="./">About</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
                <Nav.Link className="ms-auto" href="./signin">Sign In</Nav.Link>
            </Nav>
        </Navbar>
    )
};

export default Header;