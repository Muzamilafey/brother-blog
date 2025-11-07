import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../utils/api";
import "./BlogSingle.css";

const BlogSingle = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [otherPosts, setOtherPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Fetch single post
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(console.error);

    // Fetch other posts
    api
      .get("/posts")
      .then((res) => {
        const others = res.data.filter((p) => p._id !== id).slice(0, 5);
        setOtherPosts(others);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // ✅ Set dynamic page title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Muzamilafey Blog`;
    }
  }, [post]);

  if (loading) return <p className="loading">Loading post...</p>;
  if (!post) return <p className="loading">Post not found.</p>;

  return (
    <div className="blog-single-container">
      <div className="blog-main">
        <h1 className="blog-title">{post.title}</h1>
        <p className="blog-date">
          <em>{new Date(post.publishedDate).toLocaleDateString()}</em>
        </p>

        {post.coverImage ? (
          <img
            src={`http://localhost:5000${post.coverImage}`}
            alt={post.title}
            className="blog-cover"
          />
        ) : (
          <div className="blog-cover placeholder">No Image</div>
        )}

        <pre
          className="blog-content"
        >
          {post.content}
        </pre>

        {post.tags?.length > 0 && (
          <p className="blog-tags">
            <strong>Tags:</strong> {post.tags.join(", ")}
          </p>
        )}
      </div>

      <aside className="blog-sidebar">
        <h2>Other Posts</h2>
        <ul className="other-posts-list">
          {otherPosts.map((p) => (
            <li key={p._id} className="other-post-item">
              {p.coverImage && (
                <img
                  src={`http://localhost:5000${p.coverImage}`}
                  alt={p.title}
                  className="other-post-thumb"
                />
              )}
              <Link to={`/blogs/${p._id}`} className="other-post-link">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default BlogSingle;
