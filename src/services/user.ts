import http from "./http-common";
import { User } from "@/types";

class UserDataService {
  login(data: { user: { email: string; password: string } }): Promise<unknown> {
    return http.post("/users/login", data);
  }

  getAll(): Promise<any> {
    return http.get("/users");
  }

  get(id: any): Promise<User> {
    return http.get(`/users/${id}`);
  }

  create(data: any): Promise<User> {
    return http.post("/users", data);
  }

  update(data: any): Promise<User> {
    return http.put("/user", data);
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
}

export default new UserDataService();
