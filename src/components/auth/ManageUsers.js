import React, { useEffect, useState } from 'react';

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from backend (dummy data for now)
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Learner' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Teacher' },
    ]);
  }, []);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    alert('User deleted!');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-center mb-6">Manage Users</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 mr-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ManageUsers;
