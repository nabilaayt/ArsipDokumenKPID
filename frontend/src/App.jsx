import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";


function App() {

  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Login />}/>

      {/* Admin Routes */}



      {/* User Routes */}


    </Routes>
  );
};

export default App;