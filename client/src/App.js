import React from "react";
import Input from './components/Input'
import Doctors from './components/Doctors'
import Login from './components/Login'
import Signin from './components/Signin'
import Home from './components/Home'  
import "bootstrap/dist/css/bootstrap.min.css"
import PrivateRoute from './components/privateRoutes';
import { BrowserRouter ,Switch } from "react-router-dom";
import PublicRoute from './components/PublicRoute';

function App() {
  let logged=false;
  return (
    <>
    <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Login} path="/" exact />
          <PublicRoute restricted={false} component={Signin} path="/signin"  />
          <PrivateRoute  path="/home" component={Home} />
          <PrivateRoute  path="/addDoctors" component={Input} />
          <PrivateRoute  path="/doctorList" component={Doctors} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;


