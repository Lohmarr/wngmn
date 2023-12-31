import decode from 'jwt-decode';

class AuthService {
  getUser() {
    return decode(this.getToken());
  }

  getUserId() {
    // Check if the 'user_id' value is set in the localStorage
    const id = localStorage.getItem('_id');
    if (!id) {
      console.warn("'user_id' value is not set in the localStorage");
      return null;
    }
    return id;
  }

  getUserLikes() {
    // Check if the 'likes' value is set in the localStorage
    const likes = localStorage.getItem('likes');
    if (!likes || likes === "") {
      console.warn("'likes' value is not set in the localStorage");
      return [];
    }
    return JSON.parse(likes);
  }

  getName() {
    // Check if the 'birdname' value is set in the localStorage
    const name = localStorage.getItem('birdname');
    if (!name) {
      console.warn("'birdname' value is not set in the localStorage");
      return null;
    }
    return name;
  }

  getUsername() {
    // Check if the 'username' value is set in the localStorage
    const username = localStorage.getItem('username');
    if (!username) {
      console.warn("'birdname' value is not set in the localStorage");
      return null;
    }
    return username;
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    const decodedToken = decode(idToken);
    console.log('Decoded token:', decodedToken);
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('_id', decodedToken.data._id);
    localStorage.setItem('birdname', decodedToken.data.birdname);
    localStorage.setItem('username', decodedToken.data.username);
    localStorage.setItem('likes', JSON.stringify(decodedToken.data.likes));
    localStorage.setItem('likedBy', JSON.stringify(decodedToken.data.likedBy));
    console.log(decodedToken.data._id)
    window.location.assign('/dashboard');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
