import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Components/Authentication";
import Home from "./Components/Home";
import PasswordReset from "./Components/PasswordReset";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Home />} />
          <Route path="/register" element={<Authentication />} />
          <Route path="/login" element={<Authentication boxValue="login" />} />
          <Route path="/password/reset" element={<PasswordReset />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
