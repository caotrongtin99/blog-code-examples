import { useQuery, useMutation } from 'react-query'
async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  const deletePostMutation = useMutation((postId) => deletePost(postId))
  const updatePostMutation = useMutation((postId) => updatePost(postId))
  const { data, isLoading } = useQuery(['comments', post.id], () => fetchComments(post.id))

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deletePostMutation.mutate(post.id) }>Delete</button>
      <button onClick={() => updatePostMutation.mutate(post.id)}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {isLoading && <div>Loading...</div>}
      {data && data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
