import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useParams, Link } from 'react-router-dom';

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    // Fetch user data
    API.get('/auth')
      .then(res => {
        setUserRole(res.data.role);
        fetchCourse();
      })
      .catch(err => console.error(err.response.data));
  }, []);

  const fetchCourse = () => {
    API.get(`/courses/${id}`)
      .then(res => {
        setCourse(res.data);
        checkEnrollment(res.data);
      })
      .catch(err => console.error(err.response.data));
  };

  const checkEnrollment = (courseData) => {
    API.get('/auth')
      .then(res => {
        const userId = res.data._id;
        const isEnrolled = courseData.students.some(student => student._id === userId);
        setEnrolled(isEnrolled);
      })
      .catch(err => console.error(err.response.data));
  };

  const handleEnroll = () => {
    API.post(`/courses/${id}/enroll`)
      .then(res => {
        setEnrolled(true);
        fetchCourse();
      })
      .catch(err => console.error(err.response.data));
  };

  const handleUnenroll = () => {
    API.post(`/courses/${id}/unenroll`)
      .then(res => {
        setEnrolled(false);
        fetchCourse();
      })
      .catch(err => console.error(err.response.data));
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <p>Teacher: {course.teacher.name}</p>
      {userRole === 'Learner' && (
        <>
          {enrolled ? (
            <button onClick={handleUnenroll}>Unenroll</button>
          ) : (
            <button onClick={handleEnroll}>Enroll</button>
          )}
        </>
      )}
      {userRole === 'Teacher' && course.teacher._id === course.teacher._id && (
        <Link to={`/courses/edit/${id}`}>
          <button>Edit Course</button>
        </Link>
      )}
      {/* Display exams associated with the course */}
      <h3>Exams</h3>
      <ul>
        {course.exams && course.exams.map(exam => (
          <li key={exam._id}>
            <Link to={`/exams/${exam._id}`}>{exam.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
