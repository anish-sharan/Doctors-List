import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar"
import { useHistory } from "react-router-dom";
import { DropdownButton, Dropdown, Card, Container, Form, Button } from "react-bootstrap"
import env from "react-dotenv";

const axios = require('axios');


export default function Input() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [qualification, setQualification] = useState("");
    const Url = env.REACT_APP_URL;

    const changeNameHandler = (e) => {
        setName(e.target.value)
    }
    const changeSpecialityHandler = (e) => {
        console.log("text changed");
        setSpeciality(e)
    }
    const changeQualificationHandler = (e) => {
        setQualification(e)
    }
    const clickHandler = (e) => {
        e.preventDefault();
        let doctor = {
            name: name,
            speciality: speciality,
            qualification: qualification

        }
        axios.post(`${Url}/api/addDoctor`, doctor)
            .then(function (res) {
                alert("Doctor add successfully")
                history.push("/doctorList")
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <div>
            <Navbar />
            <Card style={{ width: '30rem', textAlign: "center", margin: "auto", marginTop: "5rem" }}>
                <Card.Body>
                    <Card.Title>Add Doctor</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Don't add Dr. in name</Card.Subtitle>
                    <Card.Text>
                        <Form.Control style={{ marginTop: "1rem" }} type="email" placeholder="Enter name" onChange={changeNameHandler} />
                        <Form.Label>Qualification : </Form.Label>
                        <DropdownButton onSelect={changeQualificationHandler} style={{ marginTop: "1rem" }} title={qualification || ""}>
                            <Dropdown.Item eventKey="MBBS" >MBBS</Dropdown.Item>
                            <Dropdown.Item eventKey="MS">MS</Dropdown.Item>
                        </DropdownButton><br />
                        <Form.Label> Speciality : </Form.Label>
                        <DropdownButton onSelect={changeSpecialityHandler} style={{ marginTop: "1rem" }} title={speciality || ""}>
                            <Dropdown.Item eventKey="Ortho">Ortho</Dropdown.Item>
                            <Dropdown.Item eventKey="Dentist">Dentist</Dropdown.Item>
                            <Dropdown.Item eventKey="Ent" >ENT</Dropdown.Item>
                        </DropdownButton>


                        <Button style={{ marginTop: "1rem" }} onClick={clickHandler} variant="primary" href="/signin">Add</Button>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}