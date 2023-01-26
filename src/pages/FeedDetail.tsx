import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { APP } from '../constances/routes';
import { deleteFeed, getFeed } from '../services/feed';
import { TFeed } from '../types/feed';
import { getErrorState } from '../utils/error';

export default function FeedDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState<TFeed>();
  const navigate = useNavigate();

  useEffect(() => {
    const syncGetFeed = async (id: number) => {
      setLoading(true);
      try {
        const response = await getFeed({ id });
        setFeed(response.data);
      } catch (error) {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      } finally {
        setLoading(false);
      }
    };
    syncGetFeed(Number(id));
  }, []);

  const handleDelete = async (id: number) => {
    deleteFeed({ id })
      .then((response) => {
        if (response.status === 200) {
          return navigate('/');
        }
      })
      .catch((error) => {
        const state = getErrorState(error);
        navigate(APP.ERROR, { state });
      });
  };

  return (
    <div>
      <Nav />
      {loading ? (
        <Loading />
      ) : (
        <div>
          {feed && (
            <div className="feedContainer">
              <span>{feed.id}</span>
              <span>{feed.createdAt}</span>
              <h3>{feed.title}</h3>
              <p>{feed.text}</p>
              {feed.photo && (
                <img
                  src={`http://localhost:4000/${feed.photo}`}
                  style={{ width: '300px' }}
                  alt="img"
                />
              )}
              <div>
                <span>like {feed.likes} </span>
                <span>comment</span>
              </div>
              <div>
                <Link to={`/${feed.id}/edit`}>
                  <button>수정하기</button>
                </Link>
                <button onClick={() => handleDelete(feed.id)}>삭제하기</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
