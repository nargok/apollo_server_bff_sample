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
            console.log(res.token);
    return {
      token: res.token,
    }
  }
}

export default AuthenticationAPI;