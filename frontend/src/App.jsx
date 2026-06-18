import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../../../Voting-sytem/frontend/src/pages/Login";
import Register from "../../../Voting-sytem/frontend/src/pages/Register";
import Dashboard from "../../../Voting-sytem/frontend/src/pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}