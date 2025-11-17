import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderboardPage from "@/pages/LeaderboardPage";
import "@/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeaderboardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
