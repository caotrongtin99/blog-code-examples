import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {data, hasNextPage, fetchNextPage} = useInfiniteQuery(
    'spicies',
    ({ pageParams = initialUrl}) => fetchUrl(pageParams),
    {
      getNextPageParam: (lastPage) => lastPage.next
    }
  )
  console.log({ data })
  return <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
    {data && data.pages.map(page => {
      return page.results.map(item => (<Species
        key={item.name}
        name={item.name}
        language={item.language}
        averageLifespan={item.average_lifespan}
      />))
    })}
    </InfiniteScroll>;
}
