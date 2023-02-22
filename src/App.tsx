import { Routes, Route } from "react-router-dom";

import NewAppointment from "./pages/NewAppointment";
import AdminPanel from "./pages/AdminPanel";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/new-appointment" element={<NewAppointment />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
