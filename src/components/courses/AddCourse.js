import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
    duration: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      const res = await axios.post('http://localhost:5000/courses', formData, config);
      console.log('Course added:', res.data);
      alert('Course added successfully!');
    } catch (err) {
      console.error('Error adding course:', err.response?.data || err.message);
      alert('Failed to add course: ' + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Course</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (in weeks)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={onChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter course duration"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCourse;
