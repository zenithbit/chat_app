import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NavBar from "./components/navbar";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ChatContextProvider } from "./contexts/ChatContext";
import { Login } from "./pages/login.jsx";
import { Chat } from "./pages/chat.jsx";
import Register from "./pages/Register";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container className="text-secondary">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/chat" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/chat" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/chat" /> : <Login />}
          />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
