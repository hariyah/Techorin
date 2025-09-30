import React, { useState } from "react";
import axios from "../api/axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
    display:flex;
    flex-direction:column;
    gap:12px;
    max-width:480px;
    margin:40px auto;
    `;

    const SignUp: React.FC = () => {
    const [username, setUsername] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"user" | "admin">("user");
    const [message, setMessage] = useState("");
    const nav = useNavigate();

    const submit = async () => {
        try {
        const res = await axios.post("/auth/signup", { username, gmail, password, role });
        setMessage(res.data.message);
        nav("/verify-otp", { state: { gmail } });
        } catch (err: any) {
        setMessage(err?.response?.data?.message || "Error");
        }
    };

    return (
        <Container>
        <Box>
            <Typography variant="h5">Sign Up</Typography>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Gmail" value={gmail} onChange={(e) => setGmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
            <label>
                <input type="radio" checked={role === "user"} onChange={() => setRole("user")} /> User
            </label>{" "}
            <label>
                <input type="radio" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
            </label>
            </div>
            <Button variant="contained" onClick={submit}>Sign Up</Button>
            <Typography>{message}</Typography>
            <Link to="/signin">Already have account? Sign In</Link>
        </Box>
        </Container>
    );
};

export default SignUp;
