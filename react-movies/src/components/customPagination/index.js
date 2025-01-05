import React from "react";
import { Paper, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const CustomPagination = ({ pageNumber, setCurrentPage }) => {
  return (
    <Paper 
      component="div" 
      sx={{
        display: "flex",
        justifyContent: "space-around",
        marginBottom: 1
      }}
    >
      <IconButton 
        aria-label="back" 
        onClick={() => setCurrentPage(pageNumber - 1)}
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography component="h3" variant="h5">
        Page {pageNumber}
      </Typography>

      <IconButton 
        aria-label="forward" 
        onClick={() => setCurrentPage(pageNumber + 1)}
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default CustomPagination;