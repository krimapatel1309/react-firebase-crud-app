import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(getuserdata);

    const getdata = async () => {

        setLoading(true);
        console.log(process.env.REACT_APP_FIREBASE_URL);

        const res = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/todos.json`);
        const data = await res.json();
        // console.log(data)
        if(data!==null) {
            let finaldata=[];
            Object.keys(data).forEach((key) => finaldata.push({ id: key, erno: data[key].erno, name: data[key].name, mobile: data[key].mobile }));
            setUserdata(finaldata)
        }

        
        // console.log(finaldata)

        setLoading(false);
        if (res) {
            // console.log(res.body);
        } else {
            toast.error("error in adding datta");
        }
    
    }

    useEffect(() => {
        setLoading(true);
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const dat = getuserdata.filter((i) => i.id!==id);
        // console.log(dat);

        // deleting data
        const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/todos/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: null
        })
        if (response) {
            console.log(response);
            toast.success("Deleted Successfully 😁");
        } else {
            toast.error("Something went wrong! 😢");
        }
        setUserdata(dat);
        getdata();
    }


    return (
        <>
            {
                !loading ? getuserdata.length === 0 ? (
                    <div className="container container1">
                        <span className="notfound">Data  Not found</span>
                    </div>
                ) : (
                    <div className="mt-5">
                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr className="">
                                    <th scope="col">Enrollment Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getuserdata.map((element, id) => {
                                        return (
                                            <>
                                                <tr className='eachItem'>
                                                    {/* <th scope="row">{id + 1}</th> */}
                                                    <td>{element.erno}</td>
                                                    <td>{element.name}</td>
                                                    <td>{element.mobile}</td>
                                                    <td>
                                                        <NavLink to={`view/${element.id}`}> <button className="btn btn-success" style={{"--i": "#20c997"}}><RemoveRedEyeIcon /></button></NavLink>
                                                        <NavLink to={`edit/${element.id}`}>  <button className="btn btn-primary" style={{"--i": "#0dcaf0"}}><CreateIcon /></button></NavLink>
                                                        <button className="del btn btn-danger" onClick={() => deleteuser(element.id)} style={{"--i": "#dc3545"}}><DeleteOutlineIcon /></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "calc(100vh - 12rem)",
                        fontSize: "2rem",
                    }}
                >
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
                )}
        </>
    )
}

export default Home

















