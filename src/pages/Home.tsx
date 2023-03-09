import { isAxiosError } from 'axios';
import React from 'react';
import { useInfiniteQuery } from 'react-query';
import Feed from '../components/Feed';
import InfiniteScroll from '../components/InfiniteScroll';
import Layout from '../components/Layout';
import { getFeeds } from '../services/feed';
import NotFound from './NotFound';

export default function Home() {
  const fetchFeeds = ({ pageParam }: { pageParam?: string }) => {
    return getFeeds({ cursor: pageParam, limit: 5 });
  };

  const {
    isError,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('getFeeds', fetchFeeds, {
    getNextPageParam: (data) => data.data.nextCursor,
  });

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  return (
    <div>
      <Layout>
        <div>
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.data.items.map((feed) => (
                <Feed key={feed._id} feed={feed} />
              ))}
            </React.Fragment>
          ))}
          {hasNextPage && !isFetchingNextPage && (
            <InfiniteScroll callback={fetchNextPage} />
          )}
        </div>
      </Layout>
    </div>
  );
}
