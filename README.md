# Doctors List App

## System Requirements
Make sure the system has Node.js installed.  
Commands can be run on terminal(linux/unix) or command-line(Windows) 
## To run this app, please perform the following steps:
### Create env files for configuring frontEnd and backEnd:
  
  1. In the root directory add .env file with the following parameters:<br />
     DB=!!!Mongo DB connection string!!! (for example, mongodb://localhost:27017/doctordb)<br />
     PORT=!!!Port number where backend app is to be run!!!<br />
  
  2. cd to client and add another .env file with the following parameters:<br />
     REACT_APP_URL=!!!backend app url!!! (for example, http://localhost:5000)<br />
     REACT_APP_CLIENT_ID=!!!Google OAuth Client Id!!!<br />
     REACT_APP_CLIENT_SECRET=!!!Google OAuth Client Secret!!!<br />
  
### Install node modules for frontEnd and backEnd 
  
  1. In the root directory and in client directory run the following command:
     ```javascript
        npm install
     ```
### Run frontEnd and backEnd
  
  1. Run the backEnd by running the following command in root directory:
     ```javascript
        node index.js
     ``` 
  2. Run the frontEnd by running the following command in a new terminal/command-line client directory:
     ```javascript
        npm start
     ```    

  
  
