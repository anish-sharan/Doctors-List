import React from 'react'
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, Button } from "react-bootstrap"
import axios from "axios"
import { logout, isLogin, getToken } from "../utils"
import { usehistory } from "react-router-dom"
import env from "react-dotenv";

export default function NavbarComp() {
  const Url = env.REACT_APP_URL;
  const history = useHistory();
  const clickHandler = (e) => {
    e.preventDefault();
    logout();
    let tok = getToken();
    let data = {};
    data.tk = tok;
    axios.post(`${Url}/api/user/logout`, data)
      .then(response => {
        if (response.data.success) {
          history.push("/home");
        } else {
          alert("can't log out");
        }
      }
      )
      .catch(err => alert(err));

  }
  return (
    <div>
      <Navbar fixed="top" bg="light" expand="lg">
        <Navbar.Brand href="/home" style={{ marginLeft: "2rem" }}>Doctors List App </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/addDoctors">Add Doctor</Nav.Link>
            <Nav.Link href="/doctorList">All Doctors</Nav.Link>
            <Button variant="outline-primary" onClick={clickHandler}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />

    </div>
  )
}

