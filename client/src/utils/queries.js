import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query Users {
    users {
      _id
      birdname
      img
      quote
      migration
      likes
      likedBy
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      birdname
      username
      quote
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
      img
    }
  }
`;

export const QUERY_POSTS = gql`
  query Posts($username: String) {
    posts(username: $username) {
      _id
      createdAt
      postText
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

export const GET_USER_LIKES = gql`
query GetUserLikes($id: ID!) {
  getUserLikes(id: $id) {
    birdname
    img
  }
}
`;