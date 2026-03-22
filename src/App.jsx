// Import React Hooks
import { useState, useEffect } from "react";

// Import routing tools
import { Routes, Route, Navigate } from "react-router-dom";

// Import components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Import pages
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

import "./index.css";

function App() {

  //Stores whether user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //Controls loading state
  const [isLoading, setIsLoading] = useState(true);
  //Controls sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  //Check localStorage on app load to persist login
  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");

    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
      setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      {/* Show header only when logged in */}
      {isAuthenticated && (
        <Header
          onLogout={() => {
            localStorage.removeItem("isAuthenticated");
            setIsAuthenticated(false)}} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <div style={{ display: "flex" }}>

        {/* Sidebar visible only when logged in */}
        {isAuthenticated && isSidebarOpen && <Sidebar />}

        <div style={{ padding: "1rem", flex: 1 }}>

          {/*Define application routes*/}
          <Routes>

            {/*Login page */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={() => setIsAuthenticated(true)} />}
            />

            {/*Protected dashboard */}
            <Route
              path="/"
              element={
                isAuthenticated
                  ? <Dashboard />
                  : <Navigate to="/login" />
              }
            />

            {/*Protected settings */}
            <Route
              path="/settings"
              element={
                isAuthenticated
                  ? <Settings />
                  : <Navigate to="/login" />
              }
            />

          </Routes>

        </div>
      </div>
    </>
  );
}

export default App;
