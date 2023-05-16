import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectIsLightTheme } from "../features/Theme.reducer";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const FileInput = ({ handleFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (isValidFile(file)) {
      handleFileChange(file);
    } else {
      setIsSnackbarOpen(true);
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files[0];
    if (isValidFile(file)) {
      handleFileChange(file);
    } else {
      setIsSnackbarOpen(true);
    }
  };

  const isValidFile = (file) => {
    const fileType = file.type;
    return (
      fileType === "application/pdf" ||
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "text/plain" ||
      fileType === "image/jpeg" ||
      fileType === "image/png" ||
      fileType === "image/gif"
    );
  };

  const isLightTheme = useSelector(selectIsLightTheme);
  return (
    <Box
      sx={{
        border: isDragging
          ? "2px dashed cyan"
          : isLightTheme
          ? "2px dashed black"
          : "2px dashed white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: "10px",
        height: "70vh",
      }}
      onClick={() => {
        document.querySelector(".orderFileInput").click();
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Button
        variant="contained"
        startIcon={<CloudUpload />}
        sx={{ p: 2 }}
        onClick={() => {
          document.querySelector(".orderFileInput").click();
        }}
      >
        Upload File
      </Button>
      <Typography variant="h6" color="text.secondary" sx={{ p: 2 }}>
        Or drag the file here
      </Typography>
      <input
        type="file"
        style={{ display: "none" }}
        className="orderFileInput"
        onChange={handleInputChange}
        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
      />
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="error"
        >
          Please upload a printable document (PDF, DOC, DOCX, or TXT) or an
          image file (JPG, PNG, or GIF).
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};
export default FileInput;
