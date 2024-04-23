import React from "react";
import { Button, Box, Typography } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";

function GuestInstruction() {
  const openPdf = () => {
    const pdfUrl = process.env.PUBLIC_URL + "/HuongDan.pdf";
    window.open(pdfUrl, "_blank");
  };

  const downloadPdf = () => {
    const pdfUrl = process.env.PUBLIC_URL + "/HuongDan.pdf";

    // Create a link element
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = "HuongDan.pdf";

    // Trigger a click event on the link
    document.body.appendChild(link);
    link.click();

    // Remove the link element from the DOM
    document.body.removeChild(link);
  };

  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained" onClick={openPdf}>
        Hướng dẫn
      </Button>
      <Box
        mt={4}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        justifyContent={"center"}
        sx={{ cursor: "pointer" }}
      >
        <PictureAsPdfOutlinedIcon />
        <Typography
          variant="subtitle2"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={openPdf}
        >
          Tài liệu hướng dẫn
        </Typography>
        <Button variant="contained" size="small" onClick={downloadPdf}>
          Download PDF
        </Button>
      </Box>
    </MainLayout>
  );
}

export default GuestInstruction;
