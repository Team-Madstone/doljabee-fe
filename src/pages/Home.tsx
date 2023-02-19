import { isAxiosError } from 'axios';
import { useQuery } from 'react-query';
import Feed from '../components/Feed';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { getFeeds } from '../services/feed';
import { TFeed } from '../types/feed';
import NotFound from './NotFound';

export default function Home() {
  const { isLoading, isError, data, error } = useQuery('getFeeds', getFeeds);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  return (
    <div>
      <Nav />
      <div>
        {data &&
          data.data.map((feed: TFeed) => <Feed key={feed._id} feed={feed} />)}
      </div>
    </div>
  );
}
