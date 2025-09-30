import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`max-width:480px;margin:40px auto;display:flex;flex-direction:column;gap:12px;`;

const SignIn: React.FC = () => {
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const { setAuth } = useContext(AuthContext);
    const nav = useNavigate();

    const submit = async () => {
        try {
        const res = await axios.post("/auth/signin", { gmail, password });
        const token = res.data.token;
        const role = res.data.role;
        setAuth(token, role);
        nav("/projects");
        } catch (err: any) {
        setMessage(err?.response?.data?.message || "Error");
        }
    };

    return (
        <Container>
        <Box>
            <Typography variant="h5">Sign In</Typography>
            <TextField label="Gmail" value={gmail} onChange={(e) => setGmail(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={submit}>Sign In</Button>
            <Typography>{message}</Typography>
        </Box>
        </Container>
    );
};

export default SignIn;
