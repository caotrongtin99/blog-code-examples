import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from 'react-query'

import { PostDetail } from "./PostDetail";
async function fetchPosts(pageNum) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient()

  useEffect(() => {
    queryClient.prefetchQuery(['posts', currentPage + 1], () => fetchPosts(currentPage + 1))
  }, [currentPage, queryClient])

  const { data, isLoading, isFetching } = useQuery(['posts', currentPage], () => fetchPosts(currentPage), {
    staleTime: 10000, keepPreviousData: true
  })

  return ( 
    <>
    {isFetching && <div>Fetching...</div>}
    {isLoading && <div>Loading...</div>} 
      <ul>
        {data && data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => { setCurrentPage(prev => prev - 1)}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled={currentPage >= 10} onClick={() => { setCurrentPage(prev => prev + 1)}}>
          Next page,
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
