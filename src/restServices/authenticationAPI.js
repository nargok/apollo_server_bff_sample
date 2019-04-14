import { RESTDataSource } from "apollo-datasource-rest";

class AuthenticationAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "http://127.0.0.1:8000/";
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


}

export default AuthenticationAPI;