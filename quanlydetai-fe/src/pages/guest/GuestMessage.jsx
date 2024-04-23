import React from "react";
import { Button, Box } from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { DataGrid } from "@mui/x-data-grid";

const rows = [
  {
    id: 1,
    title: "Thông báo tuyển sinh",
    date: "05/09/2023",
    pdfFile: "Tuyensinh.pdf",
  },
  {
    id: 2,
    title: "Thông báo đăng kí đề tài",
    date: "13/11/2023",
    pdfFile: "DKDT.pdf",
  },
];

const columns = [
  { field: "id", headerName: "STT", width: 50 },
  { field: "title", headerName: "Tiêu đề", width: 300 },
  { field: "date", headerName: "Ngày đăng", width: 200 },
  {
    field: "action",
    headerName: "Hành động",
    width: 200,
    renderCell: (params) => {
      const { pdfFile } = params.row;
      const handleOpenPdf = () => {
        const pdfUrl = process.env.PUBLIC_URL + `/${pdfFile}`;
        window.open(pdfUrl, "_blank");
      };

      return (
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button variant="contained" size="small" onClick={handleOpenPdf}>
            Chi tiết
          </Button>
        </Box>
      );
    },
  },
];

function GuestMessage() {
  return (
    <MainLayout>
      <Button fullWidth size="large" variant="contained">
        Thông báo
      </Button>
      <Box height={300} width={"100%"} mt={4}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </MainLayout>
  );
}

export default GuestMessage;
