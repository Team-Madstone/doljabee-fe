import { Link } from 'react-router-dom';
import { TFeed } from '../types/feed';

type TProps = {
  feed: TFeed;
};

export default function Feed({ feed }: TProps) {
  return (
    <div>
      <Link to={`/feed/${feed._id}`}>
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
            <span>like {feed.likes ? feed.likes.length : 0}</span>
            <span>comment {feed.comments ? feed.comments.length : 0}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
