import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { Link, useParams } from 'react-router-dom';

function ExamList() {
  const { courseId } = useParams();
  const [exams, setExams] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    API.get('/auth')
      .then(res => setUserRole(res.data.role))
      .catch(err => console.error(err.response.data));

    API.get(`/courses/${courseId}/exams`)
      .then(res => setExams(res.data))
      .catch(err => console.error(err.response.data));
  }, [courseId]);

  return (
    <div>
      <h2>Exams</h2>
      {userRole === 'Teacher' && (
        <Link to={`/courses/${courseId}/exams/add`}>
          <button>Add New Exam</button>
        </Link>
      )}
      <ul>
        {exams.map(exam => (
          <li key={exam._id}>
            <Link to={`/exams/${exam._id}`}>{exam.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExamList;
