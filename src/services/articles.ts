import http from "./http-common";

class ArticleDataService {
  getAll(): Promise<any> {
    return http.get("/articles");
  }

  get(id: any): Promise<any> {
    return http.get(`/articles/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post("/articles", data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`/articles/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/articles/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/articles`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/articles?title=${title}`);
  }
}

export default new ArticleDataService();
