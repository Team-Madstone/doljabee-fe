import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Feed from '../components/Feed';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { getFeeds } from '../services/feed';
import { TFeed } from '../types/feed';
import { getErrorState } from '../utils/error';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [feeds, setFeeds] = useState<TFeed[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const syncGetFeeds = async () => {
      setLoading(true);
      try {
        const response = await getFeeds();
        setFeeds(response.data);
      } catch (error) {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      } finally {
        setLoading(false);
      }
    };
    syncGetFeeds();
  }, []);

  return (
    <div>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {feeds &&
            feeds.map((feed: TFeed) => <Feed key={feed._id} feed={feed} />)}
        </div>
      )}
    </div>
  );
}
