import { Article } from "@/types";
import { ref } from "vue";
import ArticleDataService from "@/services/article";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRouter } from "vue-router";

export function useArticle() {
  const { openSnackbar } = useSnackbarStore();
  const router = useRouter();
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
  function deleteArticle(slug: string, redirect?: string) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        await ArticleDataService.delete(slug);
        openSnackbar({ text: "Article succesfuly deleted!" });
        if (redirect) {
          router.replace(redirect);
        }
        resolve(true);
      } catch (e: any) {
        console.log(e);
        if (e?.response?.data) {
          openSnackbar({ text: e?.response?.data });
        }
        reject(e);
      }
    });
  }
  return {
    getArticleLoading,
    article,
    getArticle,
    deleteArticle,
  };
}
