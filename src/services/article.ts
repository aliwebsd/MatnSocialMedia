import { Article } from "@/types";
import http from "./http-common";

class ArticleDataService {
  getAll(
    feed = false,
    offset = 0,
    limit = 10
  ): Promise<{
    data: {
      articles: Array<Article>;
      articlesCount: number;
    };
  }> {
    return http.get(
      `/articles${feed ? "/feed" : ""}?limit=${limit}&offset=${offset}`
    );
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
