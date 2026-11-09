import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ImageTreating from "./components/Modal/ImageTreating";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ValidateForgotCode from "./components/ValidateForgotCode";
import ChangePassword from "./components/ChangePassword";
import Dashboard from "./components/Dashboard";
import Logout from "./components/Logout";
import MedicDash from "./components/MedicDash";
import AdmDash from "./components/AdmDash";

function App() {
  return (
    <Routes>
      <Route path="/ProjetoMLTumor/frontend/build" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/validate" element={<ValidateForgotCode />} />
      <Route path="/changepass" element={<ChangePassword />} />
      <Route path="/dummy5" element={<ImageTreating />} />
      <Route path="/medicDash" element={<MedicDash />} />
      <Route path="/admDash" element={<AdmDash/>} />
      <Route path="*" element={<div>Página não encontrada</div>} />
    </Routes>
  );
}

export default App;
