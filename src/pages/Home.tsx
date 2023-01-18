import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Feed from '../components/Feed';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { getFeeds } from '../services/feed';
import { TFeed } from '../types/feed';
import { getErrorState } from '../utils/error';

export default function Home() {
  const [feeds, setFeeds] = useState<TFeed[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const syncGetFeeds = async () => {
      try {
        const response = await getFeeds();
        setFeeds(response.data);
      } catch (error) {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      }
    };
    syncGetFeeds();
  }, []);

  return (
    <div>
      <Nav />
      <div>
        {feeds &&
          feeds.map((feed: TFeed) => <Feed key={feed.id} feed={feed} />)}
      </div>
    </div>
  );
}
