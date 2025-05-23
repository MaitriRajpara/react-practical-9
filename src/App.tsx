import React from "react";
import { useFetch } from "./Hooks/useFetch";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const { isLoading, data, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts",
    "get",
    true 
  );

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {data && data.length > 0 ? (
        <ul>
          {data.slice(0, 15).map((post) => (
            <li key={post.id}>
              <strong>{post.title}</strong>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default PostList;
