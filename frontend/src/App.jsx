import { Routes, Route } from "react-router-dom";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";

// Pages Public
import Login from "./pages/Login";
import KonversiFile from "./pages/KonversiFile";

// Pages Admin
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDokumen from "./pages/admin/Dokumen";
import AddDokumen from "./pages/admin/AddDokumen";

// Pages User
import DashboardUser from "./pages/user/DashboardUser";
import DokumenUser from "./pages/user/DokumenUser";
import EditDokumen from "./pages/admin/EditDokumen";

// Components
import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />}/>

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/dokumen" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDokumen />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/tambahDokumen" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AddDokumen />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/editDokumen/:id" 
          element={
          <ProtectedRoute allowedRole="admin">
              <EditDokumen />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/admin/konversiFile" 
          element={
            <ProtectedRoute allowedRole="admin">
              <KonversiFile />
            </ProtectedRoute>
          } 
        />

        {/* User Routes */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute allowedRole="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/user/dokumen" 
          element={
            <ProtectedRoute allowedRole="user">
              <DokumenUser />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/user/konversiFile" 
          element={
            <ProtectedRoute allowedRole="user">
              <KonversiFile />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </>
  );
};

export default App;