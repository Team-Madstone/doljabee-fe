import { isAxiosError } from 'axios';
import { useContext } from 'react';
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

  const { isLoading, isError, data, error } = useQuery('getFeed', () =>
    getFeed({ _id })
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError && isAxiosError(error)) {
    return <NotFound />;
  }

  const handleDelete = async (_id: string) => {
    try {
      deleteFeed({ _id });
      navigate('/');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Nav />
      <div>
        {data && (
          <div className="feedContainer">
            <span>{data.data.createdAt}</span>
            <h3>{data.data.title}</h3>
            <p>{data.data.text}</p>
            {data.data.photo && (
              <img
                src={`http://localhost:4000/${data.data.photo}`}
                style={{ width: '300px' }}
                alt="img"
              />
            )}
            <div>
              <span>like {data.data.likes} </span>
              <span>comment</span>
            </div>
            {user && !userLoading && (
              <div>
                <Link to={`/${data.data._id}/edit`}>
                  <button>수정하기</button>
                </Link>
                <button onClick={() => handleDelete(data.data._id)}>
                  삭제하기
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
