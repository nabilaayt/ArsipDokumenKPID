import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages Public
import Login from "./pages/Login";
import KonversiFile from "./pages/KonversiFile";

// Pages Admin
import AdminDashboard from "./pages/admin/DashboardAdmin";
import AdminDokumen from "./pages/admin/DocumentAdmin";
import AddDokumen from "./pages/admin/AddDocument";
import DetailDokumen from "./pages/admin/DetailDocument";

// Pages User
import DashboardUser from "./pages/user/DashboardUser";
import DokumenUser from "./pages/user/DocumentUser";

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
              <DetailDokumen />
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
          path="/user/detailDokumen/:id" 
          element={
          <ProtectedRoute allowedRole="user">
              <DetailDokumen />
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