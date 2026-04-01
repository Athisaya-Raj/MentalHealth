import React, { useState } from "react";

const avatarColors = [
  "#60a5fa", "#818cf8", "#34d399", "#fb923c", "#f472b6",
  "#a78bfa", "#38bdf8", "#4ade80",
];

const getRandomColor = () =>
  avatarColors[Math.floor(Math.random() * avatarColors.length)];

const getInitials = () => "A";

const timeAgo = () => {
  const options = ["just now", "1 min ago", "a few minutes ago"];
  return options[Math.floor(Math.random() * options.length)];
};

const seedPosts = [
  {
    id: 1,
    text: "Placement season is really getting to me. Anyone else feel like they're running on empty? 😔",
    likes: 14,
    color: "#60a5fa",
    time: "10 min ago",
    liked: false,
  },
  {
    id: 2,
    text: "Reminder to everyone: it's okay to take a break. Your worth isn't defined by your GPA 💙",
    likes: 32,
    color: "#34d399",
    time: "25 min ago",
    liked: false,
  },
];

const CommunityWall = () => {
  const [posts, setPosts] = useState(seedPosts);
  const [draft, setDraft] = useState("");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handlePost = () => {
    if (!draft.trim()) return;
    const newPost = {
      id: Date.now(),
      text: draft.trim(),
      likes: 0,
      color: getRandomColor(),
      time: timeAgo(),
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setDraft("");
  };

  const handleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
          : p
      )
    );
  };

  const handleReply = (id) => {
    if (!replyText.trim()) return;
    setReplyOpen(null);
    setReplyText("");
  };

  return (
    <div className="mw-section-inner">
      <div className="mw-section-header">
        <span className="mw-section-icon">🤝</span>
        <div>
          <h2 className="mw-section-title">Anonymous Community Wall</h2>
          <p className="mw-section-desc">Share freely — no names, no judgment</p>
        </div>
      </div>

      <div className="mw-post-composer">
        <textarea
          className="mw-textarea"
          placeholder="Share something anonymously with other students..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
          maxLength={300}
        />
        <div className="mw-composer-footer">
          <span className="mw-char-count">{draft.length}/300</span>
          <button
            className="mw-post-btn"
            onClick={handlePost}
            disabled={!draft.trim()}
          >
            Post Anonymously 📨
          </button>
        </div>
      </div>

      <div className="mw-posts-list">
        {posts.map((post) => (
          <div className="mw-post" key={post.id}>
            <div className="mw-post-header">
              <div
                className="mw-post-avatar"
                style={{ background: post.color }}
              >
                {getInitials()}
              </div>
              <div className="mw-post-meta">
                <span className="mw-post-author">Anonymous Student</span>
                <span className="mw-post-time">{post.time}</span>
              </div>
            </div>
            <p className="mw-post-text">{post.text}</p>
            <div className="mw-post-actions">
              <button
                className={`mw-action-btn ${post.liked ? "mw-action-btn--liked" : ""}`}
                onClick={() => handleLike(post.id)}
              >
                ❤️ <span>{post.likes}</span>
              </button>
              <button
                className="mw-action-btn"
                onClick={() =>
                  setReplyOpen(replyOpen === post.id ? null : post.id)
                }
              >
                💬 Reply
              </button>
            </div>
            {replyOpen === post.id && (
              <div className="mw-reply-box">
                <input
                  className="mw-reply-input"
                  placeholder="Write a supportive reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  className="mw-reply-send"
                  onClick={() => handleReply(post.id)}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityWall;