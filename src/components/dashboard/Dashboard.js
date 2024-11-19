import React, { useEffect, useState } from 'react';
import API from '../../services/api';

function Dashboard() {
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalLearners: 0,
    totalExams: 0,
  });

  useEffect(() => {
    // Fetch user info
    API.get('/auth/me')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error('Failed to fetch user:', err));

    // Fetch dashboard stats
    API.get('/dashboard/stats')
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.error('Failed to fetch stats:', err));
  }, []);

  const { role } = user;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm">Welcome, {user.name || 'User'}!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Courses</h2>
            <p className="text-3xl font-bold text-blue-500">{stats.totalCourses}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Learners</h2>
            <p className="text-3xl font-bold text-green-500">{stats.totalLearners}</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Exams</h2>
            <p className="text-3xl font-bold text-purple-500">{stats.totalExams}</p>
          </div>
        </section>

        {/* Role-Based Sections */}
        {role === 'Teacher' && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Teacher Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">Create a New Course</p>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => window.location.href = '/courses/add'}
                >
                  Add Course
                </button>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">View Your Courses</p>
                <button
                  className="mt-4 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => window.location.href = '/courses'}
                >
                  View Courses
                </button>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">Add Questions</p>
                <button
                  className="mt-4 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  onClick={() => window.location.href = '/questions/add'}
                >
                  Add Question
                </button>
              </div>
            </div>
          </section>
        )}

        {role === 'Admin' && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Admin Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">Manage Users</p>
                <button
                  className="mt-4 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => window.location.href = '/users'}
                >
                  Manage Users
                </button>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">Manage Courses</p>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => window.location.href = '/courses'}
                >
                  Manage Courses
                </button>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <p className="text-gray-800 font-semibold">Add Questions</p>
                <button
                  className="mt-4 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                  onClick={() => window.location.href = '/questions/add'}
                >
                  Add Question
                </button>
              </div>
            </div>
          </section>
        )}

        {role === 'Learner' && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Enrolled Courses</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              <p className="text-gray-800">You can view your enrolled courses and exams here.</p>
              <button
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => window.location.href = '/courses'}
              >
                View Courses
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
