import { Link } from 'react-router-dom';
import { TFeed } from '../types/feed';
import styles from '../styles/components/feed.module.scss';

type TProps = {
  feed: TFeed;
};

export default function Feed({ feed }: TProps) {
  return (
    <div className={styles.container}>
      <Link to={`/feed/${feed._id}`}>
        <div className={styles.feed}>
          <div className={styles.feedInfo}>
            <p className={styles.username}>{feed.owner.username} &nbsp;</p>
            <span className={styles.date}>{feed.createdAt}</span>
          </div>
          <h3 className={styles.title}>{feed.title}</h3>
          <p className={styles.text}>{feed.text}</p>
          <div className={styles.imgWrapper}>
            {feed.photo && (
              <img
                src={`http://localhost:4000/${feed.photo}`}
                className={styles.img}
                alt="img"
              />
            )}
          </div>
          <div className={styles.box}>
            <span>like {feed.likes ? feed.likes.length : 0} &nbsp;</span>
            <span>comment {feed.comments ? feed.comments.length : 0}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
