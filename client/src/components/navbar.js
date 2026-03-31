import React from "react";
import { Box, Link, Typography } from "@mui/material";

const Navbar = () => {
    return (
        <Box
            width={"100%"}
            p="1rem 6%"
            textAlign={"center"}
            sx={{ boxShadow: 3, mb: 2, bgcolor: "purple", color: "white" }}
        >
            <Typography variant="h1" color={"white"} fontWeight="bold">
                AI GPT3 Clone
            </Typography>
            <Link href="/register" p={1}>
                Sign Up
            </Link>
            <Link href="/login" p={1}>
                Sign In
            </Link>
        </Box>
    );
};

export default Navbar;