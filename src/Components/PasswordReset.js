import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";

function PasswordReset(props) {
  const { cemail } = useLocation();
  const [email, setEmail] = useState(cemail);
  const [otp, setOTP] = useState();
  const [sOTP, setSOTP] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const getPasswordChangeOTP = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:4000/auth/sendMail/${email}/1`)
      .then((res) => {
        if (res.status === 200) {
          setSOTP(true);
          toast.success("Check your mail, OTP sent for password change!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 204) {
          toast.error("Email not found!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("OTP not sent", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/verifyOTP", { otp })
      .then((res) => {
        if (res.status === 200) {
          setOTP("");
          setPassword("");
          setEmailAuth(true);
        }
      })
      .catch((err) => {
        toast.error("Invalid OTP!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    let credential = {
      email: email,
      password: password,
    };
    axios
      .put("http://localhost:4000/auth/password/reset", credential)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Password changed!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => {
        toast.error("Failed to reset password!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  return (
    <div>
      <form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              borderRadius: "7px",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              boxShadow: "0px 10px 30px -5px #2b0000",
              padding: 10,
            }}
          >
            <ThemeProvider theme={theme}>
              <TextField
                type="email"
                variant="outlined"
                label="Email"
                placeholder="enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
              {sOTP && !emailAuth && (
                <TextField
                  type="text"
                  variant="outlined"
                  label="OTP"
                  placeholder="enter OTP"
                  value={otp}
                  onChange={(e) => {
                    setOTP(e.target.value);
                  }}
                  required
                />
              )}
              {emailAuth && (
                <TextField
                  type="password"
                  variant="outlined"
                  label="Password"
                  placeholder="enter password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              )}
              <Button
                variant="contained"
                onClick={
                  !sOTP
                    ? getPasswordChangeOTP
                    : emailAuth
                    ? resetPassword
                    : verifyOTP
                }
                type="submit"
                style={{ margin: 10 }}
              >
                {!sOTP ? "Get OTP" : emailAuth ? "Reset" : "Verify"}
              </Button>
            </ThemeProvider>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
