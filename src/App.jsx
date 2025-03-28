import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardPage from "./pages/DashboardPage"
import ProfilePage from "./pages/ProfilePage"
import PlayPage from "./pages/PlayPage"
import useAuth from "./hooks/useAuth";
import "./index.css"

function App() {

  const user = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <LoginPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/lobby/:lobbyId" element={<PlayPage />} />
      </Routes>
    </Router>
  )
}

export default App

