import React, { useState } from "react";
import { Box, Typography, TextField, Button, useMediaQuery, useTheme } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const Summary = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:600px)");

    const [text, setText] = useState("");
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/openai/summary", { text });
            setSummary(data);
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
                <Typography variant="h3">Summarize</Typography>
                <TextField
                    label="text"
                    type="text"
                    required
                    margin="normal"
                    fullWidth
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Summarize
                </Button>
                {summary && (
                    <Box mt={2}>
                        <Typography variant="h6">Summary:</Typography>
                        <Typography>{summary}</Typography>
                    </Box>
                )}
            </form>
        </Box>
    );
};

export default Summary;