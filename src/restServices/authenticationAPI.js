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
    const res = await this.post("api/token/", {
      username: username,
      password: password
    });
    return {
      access: res.access,
      refresh: res.refresh
    }
  }

  async verifyJWTtoken(token) {
    const res = await this.post("api/token/verify/", {
      token: token
    });
    // TODO 一時的にエラーを回避
    return true
  }

  async refreshJWTtoken(refreshToken) {
    const res = await this.post("api/token/refresh/", {
      refresh: refreshToken
    });
    return {
      access: res.access,
    }
  }

  async getUserList() {
        console.log("================= START DEBUG ==================");
        console.log(this);
        console.log("================= END DEBUG ==================");

    const res = await this.get("sample_app/users/");
    const users = [];
    res.map(item =>
        users.push({ username: item.username} )
    );
    return users;
  }
}

export default AuthenticationAPI;