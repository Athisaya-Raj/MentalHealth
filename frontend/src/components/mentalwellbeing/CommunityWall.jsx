import React, { useState } from "react";

function CommunityWall() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Anonymous Student",
      content: "I'm really worried about placements this semester.",
      likes: 5,
    },
    {
      id: 2,
      author: "Anonymous Student",
      content: "Feeling a bit burnt out from the continuous assignments, anyone else?",
      likes: 12,
    }
  ]);

  const [newPost, setNewPost] = useState("");

  const handlePost = () => {
    if (newPost.trim() === "") return;
    
    setPosts([
      {
        id: Date.now(),
        author: "Anonymous Student",
        content: newPost.trim(),
        likes: 0,
      },
      ...posts
    ]);
    
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="mw-card">
      <h2>Anonymous Community Wall</h2>
      
      <div className="mw-wall-input">
        <textarea
          className="mw-wall-textarea"
          placeholder="Share something anonymously..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="mw-btn-primary" onClick={handlePost}>
          Post Anonymously
        </button>
      </div>

      <div className="mw-posts-container">
        {posts.map((post) => (
          <div key={post.id} className="mw-post">
            <div className="mw-post-author">{post.author}</div>
            <div className="mw-post-content">{post.content}</div>
            <div className="mw-post-actions">
              <button className="mw-btn-action" onClick={() => handleLike(post.id)}>
                ❤️ Support {post.likes > 0 && `(${post.likes})`}
              </button>
              <button className="mw-btn-action">
                💬 Reply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityWall;
