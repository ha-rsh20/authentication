import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function PasswordReset(props) {
  const { cemail } = useLocation();
  const [email, setEmail] = useState(cemail);
  const [otp, setOTP] = useState();
  const [sOTP, setSOTP] = useState(false);
  const [emailAuth, setEmailAuth] = useState(false);
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const getPasswordChangeOTP = (e) => {
    setSOTP(true);
    e.preventDefault();
    axios
      .get(`http://localhost:4000/auth/sendMail/${email}/1`)
      .then((res) => {
        if (res.status === 200) {
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
              boxShadow: "0px 2px 20px 5px",
              padding: 10,
            }}
          >
            <input
              type="email"
              placeholder="enter email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            {sOTP && !emailAuth && (
              <input
                type="text"
                placeholder="enter OTP"
                value={otp}
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                required
              />
            )}
            {emailAuth && (
              <input
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            )}
            <button
              onClick={
                !sOTP
                  ? getPasswordChangeOTP
                  : emailAuth
                  ? resetPassword
                  : verifyOTP
              }
              type="submit"
            >
              {!sOTP ? "Get OTP" : emailAuth ? "Reset" : "Verify"}
            </button>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
