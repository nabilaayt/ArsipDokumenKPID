import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDokumen from "./pages/admin/Dokumen";
import KonversiFile from "./pages/KonversiFile";
import AddDokumen from "./pages/admin/AddDokumen";
import DashboardUser from "./pages/admin/Dashboard";
import DokumenUser from "./pages/user/DokumenUser";
import EditDokumen from "./pages/admin/EditDokumen";

function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />}/>

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      <Route path="/admin/dokumen" element={<AdminDokumen />}/>
      <Route path="/admin/tambahDokumen" element={<AddDokumen />}/>
      <Route path="/admin/editDokumen" element={<EditDokumen />}/>
      <Route path="/admin/konversiFile" element={<KonversiFile />} />

      {/* User Routes */}
      <Route path="/user/dashboard" element={<DashboardUser />}/>
      <Route path="/user/dokumen" element={<DokumenUser />}/>
      <Route path="/user/konversiFile" element={<KonversiFile />} />

    </Routes>
  );
};

export default App;