import { TComment } from '../types/comment';
import { HiOutlineX, HiPencil } from 'react-icons/hi';

type TProps = {
  comment: TComment;
};

export default function Comment({ comment }: TProps) {
  return (
    <div key={comment._id}>
      <div>
        <span>{comment.username}</span>
        <span>{comment.createdAt}</span>
      </div>
      <div>
        <p>{comment.text}</p>
      </div>
      <div>
        <button>
          <HiOutlineX size="20" />
        </button>
        <button>
          <HiPencil size="20" />
        </button>
      </div>

      <hr />
    </div>
  );
}
