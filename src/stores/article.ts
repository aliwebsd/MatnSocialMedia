import { defineStore } from "pinia";
import ArticleDataService from "../services/article";
import { ref } from "vue";
import { Article } from "@/types";
// import { useSnackbarStore } from "./snackbar";
// const { openSnackbar } = useSnackbarStore();

export const useArticleStore = defineStore("article", () => {
  const entities = ref<{
    articles: Array<Article> | [];
    articlesCount: number;
  } | null>(null);
  const loading = ref<boolean>(false);
  async function getAll(feed: boolean, offset: number, limit: number) {
    entities.value = null;
    loading.value = true;
    try {
      const { data } = await ArticleDataService.getAll(feed, offset, limit);
      entities.value = data;
    } catch (e: any) {
      console.log(e);
      // openSnackbar({ text: e?.response?.message });
      alert(e?.response?.data?.message);
    } finally {
      loading.value = false;
    }
  }
  return {
    entities,
    getAll,
    loading,
  };
});
