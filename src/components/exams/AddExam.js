import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function AddExam() {
  const { courseId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    questions: [
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/auth')
      .then(res => {
        setUserRole(res.data.role);
        if (res.data.role !== 'Teacher') {
          navigate(`/courses/${courseId}`);
        }
      })
      .catch(err => console.error(err.response.data));
  }, [navigate, courseId]);

  const { title, questions } = formData;

  const onChange = (e, index, field, optionIndex) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index][field] = e.target.value;
    } else if (field === 'options') {
      updatedQuestions[index][field][optionIndex] = e.target.value;
    } else if (field === 'correctAnswer') {
      updatedQuestions[index][field] = parseInt(e.target.value);
    }
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...questions,
        {
          questionText: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    API.post(`/courses/${courseId}/exams`, formData)
      .then(res => navigate(`/exams/${res.data._id}`))
      .catch(err => console.error(err.response.data));
  };

  return (
    <div>
      <h2>Add New Exam</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input name="title" value={title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex}>
            <h4>Question {qIndex + 1}</h4>
            <input
              placeholder="Question Text"
              value={question.questionText}
              onChange={e => onChange(e, qIndex, 'questionText')}
              required
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={e => onChange(e, qIndex, 'options', oIndex)}
                  required
                />
              </div>
            ))}
            <label>Correct Answer Index (0-3):</label>
            <input
              type="number"
              min="0"
              max="3"
              value={question.correctAnswer}
              onChange={e => onChange(e, qIndex, 'correctAnswer')}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
}

export default AddExam;
