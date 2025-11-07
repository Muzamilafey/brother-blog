import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import "./Blogs.css";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading blog posts...</p>;

  return (
    <div className="blogs-container">
      <h1 className="blogs-title">All Blog Posts</h1>
      <div className="blogs-list">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            {post.coverImage ? (
              <div className="blog-thumb-container">
                <img
                  src={`https://brother-blog.onrender.com${post.coverImage}`} // ✅ corrected
                  alt={post.title}
                  className="blog-thumb"
                />
              </div>
            ) : (
              <div className="blog-thumb-container placeholder">
                <span>No Image</span>
              </div>
            )}
            <div className="blog-info">
              <h2 className="blog-card-title">
                <Link to={`/blogs/${post._id}`}>{post.title}</Link>
              </h2>
              <p className="blog-card-date">
                <em>{new Date(post.publishedDate).toLocaleDateString()}</em>
              </p>
              <p className="blog-card-snippet">{post.content.substring(0, 150)}...</p>
              <Link to={`/blogs/${post._id}`} className="read-more">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
