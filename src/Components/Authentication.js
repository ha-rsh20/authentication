import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";

function Authentication(props) {
  const [boxValue, setBoxValue] = useState(
    props.boxValue ? props.boxValue : "register"
  );
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [otp, setOTP] = useState();
  const [sOTP, setSOTP] = useState();
  const [err, setErr] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const navigate = useNavigate();

  const handleBoxValueChange = () => {
    setBoxValue(boxValue === "register" ? "login" : "register");
  };

  const onRegister = (e) => {
    e.preventDefault();
    let newUser = {
      firstname,
      lastname,
      email,
      password,
    };
    axios
      .post("http://localhost:4000/auth/register", newUser)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Registration Successful!", {
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
            setFirstName("");
            setLastName("");
            setErr(false);
            setBoxValue("login");
          }, 1500);
        } else if (res.status === 202) {
          toast.error("Already registred!", {
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
        toast.error("Error in Registration!", {
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

  const onLogin = (e) => {
    e.preventDefault();
    let cred = {
      email,
      password,
    };
    axios
      .post("http://localhost:4000/auth/login", cred)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("rtoken", res.data.refreshToken);

          toast.success("Login Successful!", {
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
            navigate("/");
          }, 3000);
        } else if (res.status === 203) {
          toast.error("Invalid password!", {
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
          toast.error("Credential not found!", {
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
        toast.error("Credential not found!", {
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

  const authenticateEmail = () => {
    setSOTP(true);
    axios
      .get(`http://localhost:4000/auth/sendMail/${email}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Check your mail, OTP sent!", {
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
        setSOTP(false);
        toast.error("OTP not sent!", {
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

  const handlePasswordReset = () => {
    navigate("/password/reset", { email: email });
  };

  return (
    <div>
      <form>
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: "7px",
              boxShadow: "0px 10px 30px -5px #2b0000",
              padding: 10,
            }}
          >
            <ThemeProvider theme={theme}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Tabs value={boxValue} onChange={handleBoxValueChange}>
                  <Tab value="register" label="Register" />
                  <Tab value="login" label="Login" />
                </Tabs>
              </Box>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {boxValue === "register" ? (
                  <>
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Firstname"
                      placeholder="enter firstname"
                      style={{ margin: 3 }}
                      value={firstname}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      required
                    />
                    <TextField
                      type="text"
                      variant="outlined"
                      label="Lastname"
                      placeholder="enter lastname"
                      style={{ margin: 3 }}
                      value={lastname}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      required
                    />
                  </>
                ) : (
                  <></>
                )}
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  placeholder="enter email"
                  style={{ margin: 3 }}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  disabled={emailAuth}
                  required
                />
                {emailAuth === true || boxValue === "login" ? (
                  <TextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    placeholder="enter password"
                    style={{ margin: 3 }}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                ) : (
                  sOTP && (
                    <TextField
                      type="text"
                      variant="outlined"
                      placeholder="enter otp"
                      style={{ margin: 3 }}
                      value={otp}
                      onChange={(e) => {
                        setOTP(e.target.value);
                      }}
                      required
                    />
                  )
                )}
                {emailAuth && boxValue === "register" ? (
                  <>
                    <TextField
                      type="password"
                      variant="outlined"
                      label="Confirm Password"
                      placeholder="confirm password"
                      style={{ margin: 3 }}
                      onChange={(e) => {
                        if (password === e.target.value) {
                          setErr(true);
                        } else {
                          setErr(false);
                        }
                      }}
                      required
                    />
                  </>
                ) : (
                  <></>
                )}
                {boxValue === "login" && (
                  <a onClick={handlePasswordReset}>
                    <i>
                      <u>forget password</u>
                    </i>
                  </a>
                )}
              </div>
              <Button
                type="submit"
                variant="contained"
                onClick={
                  boxValue !== "register"
                    ? onLogin
                    : emailAuth
                    ? onRegister
                    : sOTP
                    ? verifyOTP
                    : authenticateEmail
                }
                style={{ margin: 10 }}
                disabled={
                  boxValue === "register" ? (emailAuth ? !err : false) : false
                }
              >
                {boxValue !== "register"
                  ? "Login"
                  : emailAuth
                  ? "Register"
                  : sOTP
                  ? "Verify"
                  : "Get OTP"}
              </Button>
              <ToastContainer />
            </ThemeProvider>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Authentication;
