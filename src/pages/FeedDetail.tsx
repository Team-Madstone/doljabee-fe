import { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import Nav from '../components/Nav';
import { UserContext } from '../context/UserContext';
import { deleteFeed, getFeed, toggleLikeFeed } from '../services/feed';
import { TError } from '../types/feed';
import NotFound from './NotFound';
import {
  HiChevronLeft,
  HiHeart,
  HiOutlineHeart,
  HiOutlineShare,
} from 'react-icons/hi';
import CommentForm from '../components/CommentForm';

export default function FeedDetail() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const params = useParams();
  const _id = params.id as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState<boolean>();

  const { isLoading, isError, data, error } = useQuery(['getFeed', _id], () =>
    getFeed({ _id })
  );

  useEffect(() => {
    if (!data) {
      return;
    }

    setIsLiked(
      !!data.data.likes.find((item) => item.user && item.user === user?._id)
    );
  }, [data, user]);

  const handleDelete = async (_id: string) => {
    try {
      deleteFeed({ _id });
      navigate('/');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  const { mutate: likeFeedMutation } = useMutation(toggleLikeFeed, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getFeed', _id]);
    },
    onError: (error: TError) => {
      if (error.response.status === 401) {
        alert('로그인 후 이용해주세요.');
      }
      setIsLiked((prev) => !prev);
    },
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleLike = () => {
    likeFeedMutation({ _id });
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert('링크를 복사했습니다.');
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
          <button onClick={handleGoBack}>
            <HiChevronLeft size="28" />
          </button>
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
              <Link to={`/feed/${feed._id}/edit`}>
                <button>수정하기</button>
              </Link>
              <button onClick={() => handleDelete(feed._id)}>삭제하기</button>
            </div>
          )}
          <div>
            <button onClick={() => toggleLike()}>
              {isLiked ? <HiHeart size="25" /> : <HiOutlineHeart size="25" />}
            </button>
            <button onClick={() => handleShare()}>
              <HiOutlineShare size="25" />
            </button>
          </div>
          <CommentForm />
        </div>
      </div>
    </div>
  );
}
