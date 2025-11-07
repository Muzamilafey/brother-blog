import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        setPosts(res.data.slice(0, 6));
        setTrending(res.data.slice(0, 5));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading posts...</p>;

  return (
    <div className="home-container">
      {/* Hero Featured */}
      {posts[0] && (
        <section className="hero-featured">
          {posts[0].coverImage ? (
            <img
              src={`https://brother-blog.onrender.com${posts[0].coverImage}`} // ✅ corrected
              alt={posts[0].title}
              className="hero-image"
            />
          ) : (
            <div className="hero-image placeholder">No Image</div>
          )}
          <div className="hero-text">
            <h1>
              <Link to={`/blogs/${posts[0]._id}`}>{posts[0].title}</Link>
            </h1>
            <p>{posts[0].content.substring(0, 150)}...</p>
          </div>
        </section>
      )}

      {/* Main Feed + Trending Sidebar */}
      <div className="main-layout">
        <div className="main-feed">
          {posts.slice(1).map((post) => (
            <div key={post._id} className="post-card">
                {post.coverImage ? (
                <img
                  src={`https://brother-blog.onrender.com${post.coverImage}`} // ✅ corrected
                  alt={post.title}
                  className="post-thumb"
                />
              ) : (
                <div className="post-thumb placeholder">No Image</div>
              )}
              <div className="post-info">
                <h3>
                  <Link to={`/blogs/${post._id}`}>{post.title}</Link>
                </h3>
                <p className="post-date">
                  {new Date(post.publishedDate).toLocaleDateString()}
                </p>
                <p className="post-snippet">{post.content.substring(0, 120)}...</p>
                <Link to={`/blogs/${post._id}`} className="read-more">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <aside className="sidebar">
          <h2>Trending</h2>
          <ul className="trending-list">
            {trending.map((post, index) => (
              <li key={post._id} className="trending-item">
                <span className="trending-number">{index + 1}</span>
                  {post.coverImage && (
                    <img
                      src={`https://brother-blog.onrender.com${post.coverImage}`} // ✅ corrected
                      alt={post.title}
                      className="trending-thumb"
                    />
                  )}
                <Link to={`/blogs/${post._id}`} className="trending-link">
                  {post.title.length > 50
                    ? post.title.substring(0, 50) + "..."
                    : post.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Home;
