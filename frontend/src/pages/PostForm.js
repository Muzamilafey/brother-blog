import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import './PostForm.css';

const PostForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/posts/${id}`)
        .then(res => {
          setFormData({
            title: res.data.title,
            content: res.data.content,
            tags: res.data.tags?.join(', ') || '',
          });
        })
        .catch(() => setError('Failed to load post'));
    }
  }, [id, isEdit]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.title.length === 0 || formData.content.length === 0) {
      setError('Title and content are required');
      return;
    }

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      data.append('tags', formData.tags);
      if (coverImage) data.append('coverImage', coverImage);

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not authorized. Please log in again.");
        return;
      }

      const config = {
        headers: { "Authorization": `Bearer ${token}` }
      };

      if (isEdit) {
        await api.put(`/posts/${id}`, data, config);
      } else {
        await api.post('/posts', data, config);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Save post error:", err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to save post');
    }
  };

  return (
    <div className="postform-container">
      <div className="postform-box">
        <h1>{isEdit ? 'Edit Post' : 'Create Post'}</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          
          <div className="input-group">
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              required
              placeholder=" "
            />
            <label>Title</label>
          </div>

          <div className="input-group">
            <textarea
              rows="10"
              value={formData.content}
              onChange={e => setFormData({...formData, content: e.target.value})}
              required
              placeholder=" "
            />
            <label>Content (will be displayed exactly as pasted)</label>
          </div>

          <div className="input-group">
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              placeholder=" "
            />
            <label>Tags (comma separated)</label>
          </div>

          <div className="input-group file-input">
            <input
              type="file"
              onChange={e => setCoverImage(e.target.files[0])}
            />
            <label>Cover Image</label>
          </div>

          <button type="submit" className="submit-btn">{isEdit ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
};




export default PostForm;
