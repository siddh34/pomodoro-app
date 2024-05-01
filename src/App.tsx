import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TimerProvider } from "./context/TimeContext";
import "./App.css";

// pages
import HomePage from "./pages/home_page";
import HistoryPage from "./pages/history_page";
import AboutUsPage from "./pages/about_us";

function App() {
    return (
        <TimerProvider>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/about" element={<AboutUsPage/>} /> 
            </Routes>
        </Router>
        </TimerProvider>
    );
}

export default App;
