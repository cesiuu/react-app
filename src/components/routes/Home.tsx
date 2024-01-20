import React, { useEffect, useState } from 'react';
import './../../style/App.css';
import './../../style/home.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface User {
  id: number;
  name: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data: Comment[] = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();
    fetchComments();
    fetchUsers();
  }, []);

  const handleCommentsClick = (postId: number) => {
    setSelectedPostId((prev) => (prev === postId ? null : postId));
  };

  const getCommentsForPost = (postId: number) => {
    return comments.filter((comment) => comment.postId === postId);
  };

  const getUserById = (userId: number) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="post-list-container">
      <h1>Posts</h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="author-container">
              <p className="post-author">{getUserById(post.userId)?.name}</p>
            </div>
            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
            </div>
            <div className="comments" onClick={() => handleCommentsClick(post.id)}>
              Comments
            </div>
            {selectedPostId === post.id && (
              <div className="comments-container">
                {getCommentsForPost(post.id).map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <p>{comment.body}</p>
                    <p className="comment-author">{comment.name} ({comment.email})</p>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

function Home() {
  useEffect(() => {
    document.title = "Home"
 }, []);
  return (
    <div className="App">
      <header className="App-header">
        <PostList />
      </header>
    </div>
  );
}

export default Home;