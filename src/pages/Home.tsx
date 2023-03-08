import { isAxiosError } from 'axios';
import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Feed from '../components/Feed';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { getFeeds } from '../services/feed';
import NotFound from './NotFound';

export default function Home() {
  const fetchFeeds = ({ pageParam }: { pageParam?: string }) =>
    getFeeds({ cursor: pageParam, limit: 5 });

  const { isFetching, isError, data, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery('getFeeds', fetchFeeds, {
      getNextPageParam: (data) => data.data.nextCursor,
    });

  if (isFetching) {
    return <Loading />;
  }

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  const handleClick = () => {
    fetchNextPage();
  };

  return (
    <div>
      <Nav />
      <div>
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.items.map((feed) => (
              <Feed key={feed._id} feed={feed} />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && <button onClick={handleClick}>next</button>}
    </div>
  );
}
