import React , {useState}from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"
import { GoogleLogin } from 'react-google-login'; 
import { Form, Button, Card } from "react-bootstrap"
import {login, getToken} from "../utils"
import {useHistory} from "react-router-dom";
import env from "react-dotenv";

export default function Signin() {
    const Url = env.REACT_APP_URL;
    const history=useHistory();
    const [FirstName,setFirstName] = useState("");
    const [LastName,setlastName] = useState("");
    const [email,setemail] = useState("");
    const [pass,setPass] = useState("");
    const [logged,setLogged] = useState(false);
    const FNameHandler = (e) =>{
        setFirstName(e.target.value)
    }
    const LNameHandler = (e) =>{
        setlastName(e.target.value)
    }
    const EmailHandler = (e) =>{
        setemail(e.target.value)
    }
    const PassHandler = (e) =>{
        setPass(e.target.value)
    }
    const clickHandler = (e) =>{
        e.preventDefault();
        let user = {};
        user.FirstName = FirstName;
        user.LastName=LastName;
        user.email=email;
        user.password=pass;
        if(!user.FirstName || !user.LastName || !user.email){
            alert("Empty Field can't sign in ")
        }else{
            axios.post(`${Url}/api/user/register`,user)
            .then(res => {
                console.log(res)
            })
            .catch(err => alert(err))
            alert(`User added successfully`);
        }
        console.log(e);
        

    }
    const responseSuccessGoogle=(res)=>{
        let user={};
        user.FirstName=res.Ys.hU;
        user.LastName=res.Ys.dS;
        user.email=res.Ys.It;
        user.token=res.mc.access_token;
        user.tokenExp=res.mc.expires_at;
        


        axios.post(`${Url}/api/user/google/signin`,user)
        .then(res=>{
                setLogged(true);
                console.log(res); 
                login(user.token);
                console.log("token"+getToken())
                history.push("/home");
                // localStorage.setItem("token",res.data.token);
         
            
        })
        .catch(err=>alert(err))
    }
    const responseErrorGoogle=()=>{
        console.log("Error")
    }
    return (
        <div>
           <Card style={{ width: '30rem',textAlign: "center", margin: "auto",marginTop:"10rem" }}>
                <Card.Body>
                    <Card.Title>Signin</Card.Title>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" onChange={FNameHandler} placeholder="First name" />
                            <Form.Control style={{marginTop:"1.5rem"}} onChange={LNameHandler} type="email" placeholder="Last email" />
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" onChange={EmailHandler} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                    </Form.Text>
                        </Form.Group>
                    </Card.Text>
                    <Card.Text>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control  onChange={PassHandler} type="password" placeholder="Password" />
                        </Form.Group>
                    </Card.Text>
                    <Button style={{width:"28rem"}}variant="primary" href="/home"onClick={clickHandler} >Login</Button>
                    <GoogleLogin
                        clientId={env.REACT_APP_CLIENT_ID}
                        buttonText="Sign in with google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseErrorGoogle}
                        cookiePolicy={'single_host_origin'}
                    /><br />
                </Card.Body>
            </Card>
        }
        </div>
    )
}
