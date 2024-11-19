import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { useParams } from 'react-router-dom';

function ExamDetails() {
  const { examId } = useParams();
  const [exam, setExam] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    API.get('/auth')
      .then(res => setUserRole(res.data.role))
      .catch(err => console.error(err.response.data));

    API.get(`/exams/${examId}`)
      .then(res => setExam(res.data))
      .catch(err => console.error(err.response.data));
  }, [examId]);

  const onChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const onSubmit = e => {
    e.preventDefault();
    API.post(`/exams/${examId}/submit`, { answers })
      .then(res => {
        setSubmitted(true);
        alert(`Your score is ${res.data.score}`);
      })
      .catch(err => console.error(err.response.data));
  };

  if (!exam) return <div>Loading...</div>;

  return (
    <div>
      <h2>{exam.title}</h2>
      {userRole === 'Learner' && !submitted && (
        <form onSubmit={onSubmit}>
          {exam.questions.map(question => (
            <div key={question._id}>
              <p>{question.questionText}</p>
              {question.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    name={question._id}
                    value={index}
                    onChange={() => onChange(question._id, index)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit Exam</button>
        </form>
      )}
      {userRole === 'Teacher' && (
        <div>
          {/* Display exam results, options to edit exam */}
          <p>Exam Management Options</p>
        </div>
      )}
    </div>
  );
}

export default ExamDetails;
