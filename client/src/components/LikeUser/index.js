import { useMutation } from '@apollo/client';
import { LIKE_USER, LIKED_BY_USER } from '../../utils/mutations';

 const Profile = ({ user, loggedInUserId }) => {
  const [likeUser] = useMutation(LIKE_USER);
  const [likedByUser] = useMutation(LIKED_BY_USER);
  const handleLikeButtonClick = () => {
    likeUser({
      variables: { userId: user.id, likedUserId: loggedInUserId },
      onCompleted: () => {
        likedByUser({
          variables: { userId: user.id, likedById: loggedInUserId },
        });
      }
    });
  };
  const isLikedByUser = user.likedBy.includes(loggedInUserId);
  return (
    <div>
      <button onClick={handleLikeButtonClick} disabled={isLikedByUser}>Like</button>
      {isLikedByUser && <p>You liked this user!</p>}
    </div>
  );
};