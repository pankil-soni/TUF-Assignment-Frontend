import "./App.css";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FlashcardSet from "./components/FlashCardSet";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AppNavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flashcards" element={<FlashcardSet />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <AppFooter />
      </div>
    </Router>
  );
}

export default App;
