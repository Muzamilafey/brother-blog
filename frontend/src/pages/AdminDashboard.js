import React, { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'Admin';

  const fetchPosts = () => {
    api.get('/posts')
      .then(res => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        fetchPosts();
      } catch {
        alert('Failed to delete post');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <span className="logged-in-user">Logged in as: {username}</span>
          <button className="btn logout" onClick={handleLogout}>Logout</button>
          <Link to="/admin/create" className="btn create">+ New Post</Link>
          <Link to="/admin/change-password" className="btn edit">Change Password</Link>
        </div>
      </div>

      {loading ? (
        <p className="loading">Loading posts...</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Published Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{new Date(post.publishedDate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/admin/edit/${post._id}`} className="btn edit">Edit</Link>
                    <button className="btn delete" onClick={() => handleDelete(post._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
