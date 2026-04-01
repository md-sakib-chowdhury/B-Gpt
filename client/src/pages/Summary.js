import React, { useState } from "react";
import { Box, Typography, TextField, Button, useMediaQuery, useTheme, Card } from "@mui/material";
import { Alert, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Summary = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const [text, settext] = useState("");
    const [summary, setSummary] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/openai/summary", { text });
            setSummary(data);
        } catch (err) {
            console.log(error); // was "error" (undefined), should be "err"
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
                    sx={{ color: "white", mt: 2 }}
                >
                    Submit
                </Button>
                <Typography mt={2}>
                    not this tool ? <Link to="/">GO BACK</Link>
                </Typography>
            </form>

            {summary ? (
                <Card sx={{
                    mt: 4, border: 1,
                    boxShadow: 0,
                    height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default'
                }}>
                    <Typography>{summary}</Typography>
                </Card>
            ) : (
                <Card sx={{
                    mt: 4, border: 1,
                    boxShadow: 0,
                    height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default'
                }}>
                    <Typography
                        variant="h5"
                        color="natural.main"
                        sx={{
                            textAlign: "center",
                            verticalAlign: "middle",
                            lineHeight: "450px",
                        }}
                    >
                        Summary Will Appear Here
                    </Typography>
                </Card>
            )}
        </Box>
    );
};

export default Summary;