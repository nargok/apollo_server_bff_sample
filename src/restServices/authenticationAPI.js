import { RESTDataSource } from "apollo-datasource-rest";

class AuthenticationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://127.0.0.1:8000/";
  }

  willSendRequest(request) {
    request.headers.set('Authorization', this.context.authenticationAPIKey);
  }

  async obtainJWTtoken(username, password) {
    const res = await this.post("obtain_jwt_token", {
      username: username,
      password: password
    });
    return {
      token: res.token,
    }
  }

  async verifyJWTtoken(token) {
    const res = await this.post("api_token_verify", {
      token: token
    });
    return {
      token: res.token,
    }
  }

  async refreshJWTtoken(token) {
    const res = await this.post("api-token-refresh/", {
      token: token
    });
    return {
      token: res.token,
    }
  }

  async getUserList() {
    const res = await this.get("sample_app/users/");
    const users = [];
    res.map(item =>
        users.push({ username: item.username} )
    );
    return users;
  }
}

export default AuthenticationAPI;