import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CourseList from './components/courses/CourseList';
import CourseDetails from './components/courses/CourseDetails';
import AddCourse from './components/courses/AddCourse';
import ExamList from './components/exams/ExamList';
import ExamDetails from './components/exams/ExamDetails';
import AddExam from './components/exams/AddExam';


// Import PrivateRoute for authentication
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Require Authentication) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <CourseList />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/add"
          element={
            <PrivateRoute>
              <AddCourse />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <PrivateRoute>
              <CourseDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:courseId/exams"
          element={
            <PrivateRoute>
              <ExamList />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:courseId/exams/add"
          element={
            <PrivateRoute>
              <AddExam />
            </PrivateRoute>
          }
        />
        <Route
          path="/exams/:examId"
          element={
            <PrivateRoute>
              <ExamDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
