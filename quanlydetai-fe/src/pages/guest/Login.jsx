import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import MainLayout from "../../components/layout/MainLayout";
import { login, loginWithGoogle } from "../../utils/api/user";
import { notify } from "../../utils/helpers/notify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await login({ username, password });
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const handleLoginGoogle = async (data) => {
    try {
      const res = await loginWithGoogle({ email: data.email });
      localStorage.setItem("user", JSON.stringify(res?.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: async (data) => {
      const res = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            Accept: "application/json",
          },
        }
      );
      handleLoginGoogle({ email: res?.data?.email });
    },
  });

  return (
    <MainLayout>
      <Box display={"flex"} justifyContent={"center"}>
        <Paper elevation={3}>
          <Box minWidth={"20vw"} padding={2}>
            <Typography textAlign={"center"} variant="h5" fontWeight={"bold"}>
              Đăng nhập
            </Typography>
            <Stack gap={2} mt={4} component={"form"} onSubmit={handleLogin}>
              <TextField
                fullWidth
                size="small"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <TextField
                fullWidth
                size="small"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button fullWidth size="medium" variant="contained" type="submit">
                Login
              </Button>
              <Box display={"flex"} justifyContent={"center"}>
                {/* <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleLoginGoogle(jwtDecode(credentialResponse.credential));
                  }}
                  onError={() => {
                    notify("error", "Đăng nhập Google thất bại");
                  }}
                /> */}

                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  color="error"
                  onClick={() => loginGoogle()}
                >
                  Login with Google
                </Button>
              </Box>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default Login;
