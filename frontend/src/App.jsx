import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
import Academics from "./Pages/Academics";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/academics" element={<Academics />} />
      </Routes>
    </Router>
  );
}

export default App;
