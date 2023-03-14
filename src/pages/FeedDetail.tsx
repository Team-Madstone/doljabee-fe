import { isAxiosError } from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { UserContext } from '../context/UserContext';
import { deleteFeed, getFeed, toggleLikeFeed } from '../services/feed';
import { TError } from '../types/feed';
import NotFound from './NotFound';
import {
  HiChevronLeft,
  HiDotsVertical,
  HiHeart,
  HiOutlineHeart,
  HiOutlineShare,
} from 'react-icons/hi';
import CommentForm from '../components/CommentForm';
import Layout from '../components/Layout';
import styles from '../styles/feedDetail.module.scss';
import classNames from 'classnames';
import '../styles/components/button.scss';

export default function FeedDetail() {
  const { user, isLoading: userLoading } = useContext(UserContext);
  const params = useParams();
  const _id = params.id as string;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <Layout>
        <div>
          <div className={styles.feedContainer}>
            <div className={styles.feedTop}>
              <button className="btn" onClick={handleGoBack}>
                <HiChevronLeft
                  className={classNames('icon', 'xx-large', 'black')}
                />
              </button>
              <div className={styles.feedInfo}>
                <p>{feed.owner.username} &nbsp;</p>
                <span>{feed.createdAt}</span>
              </div>
              {user && !userLoading && feed.owner._id === user?._id && (
                <>
                  <button
                    className="btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <HiDotsVertical
                      className={classNames('icon', 'large', 'black')}
                    />
                  </button>
                  {isMenuOpen && (
                    <div className={styles.menuWrapper}>
                      <div className={styles.menu}>
                        <Link to={`/feed/${feed._id}/edit`}>수정하기</Link>
                        <button
                          className={classNames('bg-btn')}
                          onClick={() => handleDelete(feed._id)}
                        >
                          삭제하기
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <h3 className={styles.title}>{feed.title}</h3>
            <p className={styles.text}>{feed.text}</p>
            {feed.photo && (
              <img
                src={`http://localhost:4000/${feed.photo}`}
                // style={{ width: '300px' }}
                alt="img"
              />
            )}
            <div className={styles.box}>
              <span>like {feed.likes ? feed.likes.length : 0} &nbsp;</span>
              <span>comment {feed.comments ? feed.comments.length : 0}</span>
            </div>
            <div>
              <button className="btn" onClick={() => toggleLike()}>
                {isLiked ? (
                  <HiHeart
                    className={classNames('icon', 'x-large', 'purple')}
                  />
                ) : (
                  <HiOutlineHeart
                    className={classNames('icon', 'x-large', 'purple')}
                  />
                )}
              </button>
              <button className="btn" onClick={() => handleShare()}>
                <HiOutlineShare
                  className={classNames('icon', 'x-large', 'purple')}
                />
              </button>
            </div>
            <CommentForm comments={feed.comments} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
