import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import "./App.scss";
import NotFound from "./pages/NotFound";
import NewAppointment from "./pages/NewAppointment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/new-appointment" element={<NewAppointment />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
