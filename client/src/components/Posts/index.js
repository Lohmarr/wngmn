import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../../utils/queries";

const Posts = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let bird;

  data.users.forEach((user) => {
    if (user._id === id) {
      bird = user;
    }
  });

  if (!bird || !bird.posts) {
    return (
      <p>! Posts are a feature still currently being developed! Apologies.</p>
    );
  }

  return (
    <div>
      {loading ? (
        <div>Loading posts...</div>
      ) : (
        <div>
          {bird.posts.map((post) => (
            <div key={post.id}>
              <p>{post.postText}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
