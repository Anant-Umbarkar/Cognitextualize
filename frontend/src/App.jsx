import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Auth from './Pages/Auth/Auth';
import Layout from './Components/Layout/Layout';
import Analysis from './Pages/Analysis/Analysis';
import Report from './Pages/Report/Report';
import Sample from './Pages/Sample/Sample';

// 🔒 Route protection component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>Hello</h1>} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/report" element={<Report />} />
        <Route path="/sample" element={<Sample />} />
        
        {/* 🔐 Protected route example */}
        <Route
          path="/analyze"
          element={
            <PrivateRoute>
              <Analysis/>
            </PrivateRoute>
          }
        />
      </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
