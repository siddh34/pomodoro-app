import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// pages
import home_page from "./pages/home_page";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={home_page()} />
            </Routes>
        </Router>
    );
}

export default App;
