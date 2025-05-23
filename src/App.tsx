import { useFetch } from "./Hooks/useFetch";

const App = () => {
  const { isLoading, response, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    "get",
    true
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <ul>
      {response?.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default App