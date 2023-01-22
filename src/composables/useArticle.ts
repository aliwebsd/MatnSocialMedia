import { Article } from "@/types";
import { ref } from "vue";
import ArticleDataService from "@/services/article";

export function useArticle() {
  const getArticleLoading = ref<boolean>(false);
  const article = ref<Article>();
  async function getArticle(slug: string) {
    try {
      getArticleLoading.value = true;
      const { data } = await ArticleDataService.get(slug);
      article.value = data.article;
    } catch (e) {
      console.log(e);
    } finally {
      getArticleLoading.value = false;
    }
  }
  return {
    getArticleLoading,
    article,
    getArticle,
  };
}
