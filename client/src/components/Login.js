import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Card } from "react-bootstrap"
import axios from "axios";
import { login } from "../utils"
import { useHistory } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import env from "react-dotenv";



export default function Login() {
    const history = useHistory();
    const [email, setemail] = useState("");
    const [password, setPass] = useState("");
    const Url = env.REACT_APP_URL;
    let doc;
    const EmailHandler = (e) => {
        setemail(e.target.value)
    }
    const PassHandler = (e) => {
        setPass(e.target.value)
    }
    const vailidate = (doc) => {
        console.log("from validate function ", doc);
        if (!doc.email || !doc.password) {
            alert("email is empty");
        } if (doc.password < 6) {
            alert("password is small");
        } else {
            console.log("validate")
        }

    }
    const clickHandler = (e) => {
        e.preventDefault();
        let user = {};
        user.email = email;
        user.password = password;
        if (!user.email || !user.password) {
            alert("email or password is empty can't login");
        } if (user.password.length < 6) {
            alert("password is small can't login");
        } else {
            console.log(user);
            axios.post(`${Url}/api/user/login`, user)
                .then(res => {
                    console.log(res)
                    if (!res.data.loginSuccess) {
                        alert(res.data.message)
                    } else {
                        console.log(res);
                        console.log(res.data.token);
                        login(res.data.token);
                        history.push("/home");
                    }
                })
                .catch(err => alert(err));
        }
    }
    const responseSuccessGoogle = (res) => {
        console.log(res)
        console.log("first name", res.Ys.hU);
        console.log("last name", res.Ys.dS);
        console.log("token", res.mc.access_token);
        console.log("first issued", res.mc.first_issued_at);
        let user = {};
        user.FirstName = res.Ys.hU;
        user.LastName = res.Ys.dS;
        user.email = res.Ys.It;
        user.token = res.mc.access_token;
        user.tokenExp = res.mc.expires_at;
        console.log(user);
        axios.post(`${Url}/api/user/google/login`, user)
            .then(res => {
                console.log(res);
                if (res.data.loginSuccess) {
                    console.log("login success");
                    login(user.token);
                    history.push("/home")
                }
            })
            .catch(err => alert(err));



    }
    const responseErrorGoogle = (res) => {
        console.log(res);
    }
    return (
        <div>
            <Card style={{ width: '30rem', textAlign: "center", margin: "auto", marginTop: "10rem" }}>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control onChange={EmailHandler} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control onChange={PassHandler} type="password" placeholder="Password" />
                        </Form.Group>
                    </Card.Text>
                    <Button style={{ width: "28rem" }} variant="primary" onClick={clickHandler}  >Login</Button>
                    <br />
                    <GoogleLogin
                        clientId={env.REACT_APP_CLIENT_ID}
                        buttonText="Login with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}

                    /><br />
                    <Button style={{ marginTop: "1rem" }} variant="outline-primary" href="/signin">Signin</Button>
                </Card.Body>
            </Card>
        </div>
    )
}