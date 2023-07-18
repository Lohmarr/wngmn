import { useSubscription } from '@apollo/client';
import { NEW_LIKE_RECEIVED } from './subscriptions';

 function BirdLikeNotification({ userId }) {

  const { data, loading } = useSubscription(NEW_LIKE_RECEIVED, {
    variables: { userId },
  });

   if (loading) {
    return <p>Loading...</p>;
  }

   if (data && data.onLikeReceived) {
    const { birdname, img } = data.onLikeReceived;
    return (
      <div>
        <p>You recieved a new like!</p>
      </div>
    );
  }
   return null;
}

module.exports = BirdLikeNotification