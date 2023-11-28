import React, { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import "./index.css";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Circles type="Oval" color="#000000" height={50} width={50} />
    </div>
  );

  return (
    <div color="black">
      {loading ? (
        renderLoader()
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post.id} className="background-look">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <button className="post-btn">View Full Post</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
