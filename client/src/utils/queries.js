import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      birdname
      username
      img
      quote
      migration
      likes
      likedBy
      posts {
        comments {
          _id
          commentAuthor
          commentText
          createdAt
        }
        createdAt
        postAuthor
        postText
      }
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    users(userId: $userId) {
      _id
      birdname
      username
      img
      quote
      migration
      likes
      likedBy
      posts {
        comments {
          _id
          commentAuthor
          commentText
          createdAt
        }
        createdAt
        postAuthor
        postText
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts {
    posts {
      _id
      createdAt
      postText
      postAuthor
    }
  }
`;
export const QUERY_USER_POSTS = gql`
  query Posts($userId: ID!) {
    userPosts(userId: $userId) {
      _id
      createdAt
      postText
      postAuthor
    }
  }
`;

export const QUERY_SINGLE_POST = gql`
  query Post($postId: ID!) {
    post(postId: $postId) {
      _id
      createdAt
      postAuthor
      postText
      comments {
        _id
        commentText
        commentAuthor
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      birdname
      img
      quote
      username
      posts {
        createdAt
        _id
        postText
      }
    }
  }
`;

export const QUERY_LIKES = gql`
query GetLikes($userId: ID!) {
  getLikes(userId: $userId) {
    likedBy
  }
}
`;
