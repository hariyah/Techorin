import React, { useState } from "react";
import axios from "../api/axios";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`max-width:480px;margin:40px auto;display:flex;flex-direction:column;gap:12px;`;

const VerifyOtp: React.FC = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const nav = useNavigate();
    const location = useLocation();
    const gmail = (location.state as any)?.gmail || "";

    const doVerify = async () => {
        try {
        const res = await axios.post("/auth/verify-otp", { gmail, otp });
        setMessage(res.data.message);
        nav("/signin");
        } catch (err: any) {
        setMessage(err?.response?.data?.message || "Error");
        }
    };

    return (
        <Container>
        <Box>
            <Typography variant="h5">Verify OTP</Typography>
            <Typography>OTP was sent to {gmail}</Typography>
            <TextField label="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button variant="contained" onClick={doVerify}>Verify</Button>
            <Typography>{message}</Typography>
        </Box>
        </Container>
    );
};

export default VerifyOtp;
