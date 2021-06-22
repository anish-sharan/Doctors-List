import React, { useState } from 'react'
import axios from 'axios';
import SearchItem from "./SearchItem"
import "bootstrap/dist/css/bootstrap.min.css"
import { DropdownButton, Dropdown, Card, Container, Form, Button } from "react-bootstrap"
import env from "react-dotenv";
const queryString = require('query-string');


export default function Search() {
    const Url = env.REACT_APP_URL;
    const [name, setName] = useState("");
    const [d, setD] = useState([]);
    const [qualification, setqualification] = useState("");
    const [speciality, setspeciality] = useState("");
    let docObj = {};
    const changeHandler = (e) => {
        setName(e.target.value)
        docObj.name = e.target.value;
    }
    const clickHandler = (e) => {
        e.preventDefault();
        docObj.name = name;
        docObj.qualification = qualification;
        docObj.speciality = speciality;
        const stringified = queryString.stringify(docObj);
        axios.get(`${Url}/api/search?${stringified}`)
            .then(json => setD(json.data));
        console.log(`${Url}/api/search?${stringified}`);
        console.log(d);

    }
    const qualificationHandler = (e) => {
        setqualification(e);
    }
    const specialityHandler = (e) => {
        setspeciality(e);
    }
    return (
        <div>
            <Card style={{ width: '60rem', textAlign: "center", margin: "auto", marginTop: "5rem" }}>
                <Card.Body>
                    <Card.Title>Search Doctor</Card.Title>
                    <Card.Text>
                        <div style={{ alignItems: "center", justifyContent: "center" }}>
                            <Form.Control onChange={changeHandler} type="text" placeholder="Enter Doctor Name (Don't add Dr. in name)" style={{ display: "inline-block", width: "30rem" }} /><br /><br />
                            <Form.Label>Qualification : </Form.Label>
                            <DropdownButton onSelect={qualificationHandler} style={{ marginTop: "1rem" }} title={qualification || ""}>
                                <Dropdown.Item eventKey="MBBS" >MBBS</Dropdown.Item>
                                <Dropdown.Item eventKey="MS">MS</Dropdown.Item>
                                <Dropdown.Item eventKey="">All</Dropdown.Item>
                            </DropdownButton><br />
                            <Form.Label> Speciality : </Form.Label>
                            <DropdownButton onSelect={specialityHandler} style={{ marginTop: "1rem" }} title={speciality || ""}>
                                <Dropdown.Item eventKey="Ortho">Ortho</Dropdown.Item>
                                <Dropdown.Item eventKey="Dentist">Dentist</Dropdown.Item>
                                <Dropdown.Item eventKey="Ent" >ENT</Dropdown.Item>
                                <Dropdown.Item eventKey="">All</Dropdown.Item>
                            </DropdownButton>
                            <Button onClick={clickHandler} style={{ marginTop: "1rem" }} variant="outline-primary">Search</Button>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <SearchItem items={[...d]} />
        </div>

    )
}