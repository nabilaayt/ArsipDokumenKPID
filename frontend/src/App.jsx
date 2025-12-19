import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDokumen from "./pages/admin/Dokumen";
import KonversiFile from "./pages/KonversiFile";


function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />}/>
      <Route path="/konversiFile" element={<KonversiFile />}/>

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      <Route path="/admin/dokumen" element={<AdminDokumen />}/>

      {/* User Routes */}


    </Routes>
  );
};

export default App;