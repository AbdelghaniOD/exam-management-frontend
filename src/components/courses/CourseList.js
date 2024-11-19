import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link } from 'react-router-dom';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user data to get the role
    API.get('/auth')
      .then(res => {
        setUserRole(res.data.role);
        fetchCourses();
      })
      .catch(err => console.error(err.response.data));
  }, []);

  const fetchCourses = () => {
    API.get('/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err.response.data));
  };

  return (
    <div>
      <h2>Courses</h2>
      {userRole === 'Teacher' || userRole === 'Admin' ? (
        <Link to="/courses/add">
          <button>Add New Course</button>
        </Link>
      ) : null}
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
