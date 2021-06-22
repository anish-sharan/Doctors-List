import React, { useState, useEffect } from 'react'
import axios from 'axios';
import SearchItem from "./SearchItem"
import Navbar from './Navbar'
import env from "react-dotenv";
export default function Doctors() {
    const Url = env.REACT_APP_URL;

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${Url}/api/doctors`)
            .then(json => {
                setData(json.data)
                console.log("all data", data)
            }).catch(err => alert(err))
    }, [data])
    return (
        <div>
            <Navbar />
            <SearchItem items={[...data]} />
        </div>
    )
}


