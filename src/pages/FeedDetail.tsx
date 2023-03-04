import { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { UserContext } from '../context/UserContext';
import { deleteFeed, getFeed } from '../services/feed';
import NotFound from './NotFound';

export default function FeedDetail() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const params = useParams();
  const _id = params.id as string;
  const navigate = useNavigate();

  const { isLoading, isError, data, error } = useQuery(['getFeed', _id], () =>
    getFeed({ _id })
  );

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  const handleDelete = async (_id: string) => {
    try {
      deleteFeed({ _id });
      navigate('/');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  if (!isLoading && !data?.data) {
    return <NotFound />;
  }

  const feed = data.data;

  return (
    <div>
      <Nav />
      <div>
        <div className="feedContainer">
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
            <span>like {feed.likes ? feed.likes.length : 0} </span>
            <span>comment</span>
          </div>
          {user && !userLoading && (
            <div>
              <Link to={`/${feed._id}/edit`}>
                <button>수정하기</button>
              </Link>
              <button onClick={() => handleDelete(feed._id)}>삭제하기</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
