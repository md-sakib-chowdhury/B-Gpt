import React, { useState } from "react";
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/v1/auth/login", { email, password });
            toast.success("Login Successfully");
            localStorage.setItem("authToken", true);
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response.data.error) {
                setError(err.response.data.error);
            } else if (err.message) {
                setError(err.message);
            }
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <Box
            width={isNotMobile ? "40%" : "80%"}
            p={"2rem"}
            m={"2rem auto"}
            borderRadius={5}
            sx={{ boxShadow: 5 }}
            backgroundColor={theme.palette.background.alt}
        >
            <Collapse in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>
            <form onSubmit={handleSubmit}>
                <Typography variant="h3">Sign In</Typography>
                <TextField
                    label="email"
                    type="email"
                    required
                    margin="normal"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    label="password"
                    type="password"
                    required
                    margin="normal"
                    fullWidth
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Sign In
                </Button>
                <Typography mt={2}>
                    Don't have an account? <a href="/register">Sign Up</a>
                </Typography>
            </form>
        </Box>
    );
};

export default Login;