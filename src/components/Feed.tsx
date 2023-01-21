import { Link } from 'react-router-dom';
import { TFeed } from '../types/feed';

type TProps = {
  feed: TFeed;
};

export default function Feed({ feed }: TProps) {
  return (
    <div>
      {feed && (
        <Link to={`/${feed.id}`}>
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
          </div>
        </Link>
      )}
    </div>
  );
}
