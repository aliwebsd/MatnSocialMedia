import { Article, ArticleForm } from "@/types";
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

  get(slug: string): Promise<{ data: { article: Article } }> {
    return http.get(`/articles/${slug}`);
  }

  create(data: {
    article: ArticleForm;
  }): Promise<{ data: { article: Article } }> {
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

  getTags(): Promise<{ data: { tags: string[] } }> {
    return http.get("/tags");
  }

  postComment(slug: string, data: string): Promise<any> {
    return http.post(`/articles/${slug}/comments`, {
      comment: { body: data },
    });
  }

  deleteComment(slug: string, id: number): Promise<any> {
    return http.delete(`/articles/${slug}/comments/${id}`);
  }

  getComments(slug: string): Promise<any> {
    return http.get(`/articles/${slug}/comments`);
  }

  favorite(slug: string, isFav: boolean): Promise<any> {
    if (isFav) {
      return http.post(`/articles/${slug}/favorite`);
    } else {
      return http.delete(`/articles/${slug}/favorite`);
    }
  }
}

export default new ArticleDataService();
