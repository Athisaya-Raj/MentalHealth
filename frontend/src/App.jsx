import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import StudentHome from "./Pages/StudentHome";
import Academics from "./Pages/Academics";
import CourseWiseReview from "./Pages/CourseWiseReview";
import Timetable from "./Pages/Timetable";
import TeacherDashboard from "./Pages/TeacherDashboard";
import Placements from "./Pages/Placements";
import MentalWellbeing from "./Pages/MentalWellbeing";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/student/course-wise-review" element={<CourseWiseReview />} />
        <Route path="/student/timetable" element={<Timetable />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/mentalwellbeing" element={<MentalWellbeing />} />

      </Routes>
    </Router>
  );
}

export default App;
