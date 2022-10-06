import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'sw-people',
    ({ pageParams = initialUrl }) => fetchUrl(pageParams),
    {
      getNextPageParam: (lastPage) => lastPage.next
    }
  )

  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data && data.pages.map(page => {
      return page.results.map(person => (
        <Person
          key={person.name}
          name={person.name}
          hairColor={person.hair_color}
          eyeColor={person.eye_color}
        />
      ))
    })}
  </InfiniteScroll>;
}
