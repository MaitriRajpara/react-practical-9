import useFetch from "./components/useFetch";

type Post = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const { data, isLoading, error } = useFetch({
    url: "https://jsonplaceholder.typicode.com/posts",
  });

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map((post: Post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
