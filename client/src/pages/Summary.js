import React, { useState } from "react";
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Summary = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [text, settext] = useState("");
    const [summmary, setsummary] = useState("");


    //register ctrl
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/openai/summary", { text });
            setSummary(data)
        } catch (err) {
            console.log(error);
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
                <Typography variant="h3">Summarize Text</Typography>
                <TextField
                    placeholder="add your text"
                    type="text"
                    multiline={true}
                    required
                    margin="normal"
                    fullWidth
                    value={text}
                    onChange={(e) => {
                        settext(e.target.value);
                    }}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ mt: 2 }}
                >
                    SIGN IN
                </Button>
                <Typography mt={2}>
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        style={{ color: "green", cursor: "pointer" }}
                    >
                        Sign Up
                    </span>
                </Typography>
            </form>
        </Box>
    );
};

export default Summary;