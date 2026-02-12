import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import StudentHome from "./Pages/StudentHome";
import Academics from "./Pages/Academics";
import CourseWiseReview from "./Pages/CourseWiseReview";
import Timetable from "./Pages/Timetable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/student/course-wise-review" element={<CourseWiseReview />} />
        <Route path="/student/timetable" element={<Timetable />} />

      </Routes>
    </Router>
  );
}

export default App;
