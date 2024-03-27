import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import HomePage from "./pages/home_page";
import HistoryPage from "./pages/history_page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
            </Routes>
        </Router>
    );
}

export default App;
