import http from "./http-common";
import { User, UserSetting } from "@/types";

class UserDataService {
  login(data: { user: { email: string; password: string } }): Promise<unknown> {
    return http.post("/users/login", data);
  }

  logout() {
    localStorage.removeItem("user");
  }

  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(id: any): Promise<User> {
    return http.get(`/users/${id}`);
  }

  create(data: { user: User }): Promise<User> {
    return http.post("/users", data);
  }

  update(user: UserSetting): Promise<{ data: { user: UserSetting } }> {
    return http.put("/user", { user });
  }

  delete(id: any): Promise<any> {
    return http.delete(`/users/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/users`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/users?title=${title}`);
  }

  setStorage(value: User) {
    localStorage.setItem("user", JSON.stringify(value));
  }

  getStorage(): User | null {
    try {
      return JSON.parse(localStorage.getItem("user") ?? "");
    } catch {
      return null;
    }
  }

  isAuthorized() {
    return !!localStorage.getItem("user");
  }
}

export default new UserDataService();
