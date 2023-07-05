import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const Edit = () => {
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const [inpval, setINP] = useState({
        erno: "",
        name: "",
        mobile: "",
    });

    const setdata = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value,
            };
        });
    };

    const { id } = useParams("");
    // console.log(id);

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
            setLoading(false);
            // console.log(id);
            // const withid = data.concat(id);
            console.log(finaldat);
            setINP(finaldat);
            // console.log(inpval)
        }

    };

    useEffect(() => {
        getdata();
    }, []);

    const updateuser = async (e) => {
        e.preventDefault();

        const { erno, name, mobile } = inpval;

        if (erno === "") {
            toast.warn("Enter the Enrollment Number");
        } else if (name === "") {
            toast.warn("Enter the name");
        } else if (mobile === "") {
            toast.warn("Enter the Mobile Number");
        } else {
            console.log(inpval);
            setLoading(true);
            
            const response = await fetch(`${process.env.REACT_APP_FIREBASE_URL}/todos/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inpval)
            })
            setLoading(false);
            if (response) {
                // console.log(response);
                toast.success("Updated Successfully 😁");
                history.goBack();
            } else {
                toast.error("Something went wrong! 😢");
            }
        }
    };

    return (
        <>
            {!loading ? (
                <div className="container container1">
                    <form className="mt-4 backrel">
                        <NavLink to={`/`} style={{ "--i": "#ffc107" }}>
                            <button
                                className="view back btn btn-primary mx-2"
                                onClick={history.goBack}
                            >
                                <ArrowBackIosNewOutlinedIcon />
                            </button>
                        </NavLink>
                        <div className="container cont2 p-5 d-flex justify-content-center align-item-center flex-column">
                            <div class="mb-3 col-12">
                                <label for="erno" class="form-label">
                                    Enrollment Number
                                </label>
                                <input
                                    type="number"
                                    value={inpval.erno}
                                    onChange={setdata}
                                    name="erno"
                                    class="form-control"
                                    id="erno"
                                    placeholder="Enter Enrollment Number"
                                />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="name" class="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={inpval.name}
                                    onChange={setdata}
                                    name="name"
                                    class="form-control"
                                    id="name"
                                    placeholder="Enter your Name"
                                />
                            </div>
                            <div class="mb-3 col-12">
                                <label for="mobile" class="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="number"
                                    value={inpval.mobile}
                                    onChange={setdata}
                                    name="mobile"
                                    class="form-control"
                                    id="mobile"
                                    placeholder="Enter Mobile Number"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={updateuser}
                                class="col-12 mt-5 sbtn specbtn"
                                style={{ "--i": "#fd7e14" }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
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

export default Edit;
