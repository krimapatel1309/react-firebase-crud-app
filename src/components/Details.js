import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import CreateIcon from "@mui/icons-material/Create";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Details = () => {
    const [loading, setLoading] = useState(true);
    const [getuserdata, setUserdata] = useState({});
    // console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();

    const getdata = async () => {
        setLoading(true);

        const res = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/todos/${id}.json`)
        const data = await res.json();
        console.log(data);
        const finaldat = {...data, id};
        console.log(finaldat);

        if (!res) {
            // console.log("error");
            toast.error("Error in fetching data! 😢");
        } else {
            // console.log("get data");
            setLoading(false);
            // console.log(id);
            // const withid = data.concat(id);
            console.log(finaldat);
            setUserdata(finaldat);
            // console.log(getuserdata)
        };
        }


    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        console.log(id);
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
            history.push("/");
        } else {
            toast.error("Something went wrong! 😢");
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container container1 padd">
                    <span className="notfound">
                        <h1
                            style={{ fontWeight: 100, fontSize: "4rem" }}
                            className="mb-5"
                        >
                            Welcome&nbsp;
                            <span className="uniq">{getuserdata.name}</span>
                        </h1>
                        <div className="row row1">
                            <div className="left_view col-12">
                                <div className="row row1">
                                    <div className="col-6 plpl">
                                        <img
                                            src="/profile.png"
                                            style={{ width: "7.5rem" }}
                                            alt="profile"
                                        />
                                    </div>
                                    <div className="my-auto col-6 text-right">
                                        <NavLink
                                            to={`/edit/${getuserdata.id}`}
                                            style={{ "--i": "#0dcaf0" }}
                                        >
                                            <button className="view btn btn-primary mx-2">
                                                <CreateIcon />
                                            </button>
                                        </NavLink>
                                        <button
                                            className="view btn btn-danger"
                                            onClick={() =>
                                                deleteuser(getuserdata.id)
                                            }
                                            style={{ "--i": "#dc3545" }}
                                        >
                                            <DeleteOutlineIcon />
                                        </button>
                                        <button
                                            className="view btn btn-primary mx-2"
                                            style={{ "--i": "#ffc107" }}
                                            onClick={history.goBack}
                                        >
                                            <ArrowBackIosNewOutlinedIcon />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="mt-5 dgird">
                                    <span className="minmin">
                                        Enrollent Number
                                    </span>
                                    <span>{getuserdata.erno}</span>
                                </h3>
                                <h3 className="mt-4 dgird">
                                    <span className="minmin">Name</span>
                                    <span>{getuserdata.name}</span>
                                </h3>
                                <h3 className="mt-4 dgird">
                                    <span className="minmin">Mobile</span>
                                    {/* <PhoneAndroidIcon /> */}
                                    <span>+91 {getuserdata.mobile}</span>
                                </h3>
                            </div>
                        </div>
                    </span>
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
    );
};

export default Details;
