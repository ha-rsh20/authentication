import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Home(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    axios
      .post("http://localhost:4000/auth/post", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        toast.error("Error occured!", {
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
  },[]);

  return (
    <div>
      <span>{data ? data.firstname:"Home"}</span>
      <ToastContainer />
    </div>
  );
}

export default Home;
