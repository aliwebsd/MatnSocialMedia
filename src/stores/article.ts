import { defineStore } from "pinia";
import ArticleDataService from "../services/article";
import { ref } from "vue";
import { Article } from "@/types";
import { useSnackbarStore } from "./snackbar";

export const useArticleStore = defineStore("article", () => {
  const { openSnackbar } = useSnackbarStore();
  const entities = ref<{
    articles: Array<Article> | [];
    articlesCount: number;
  }>({
    articles: [],
    articlesCount: 0,
  });
  const loading = ref<boolean>(false);
  async function getAll(feed: string, offset: number, limit: number) {
    entities.value = {
      articles: [],
      articlesCount: 0,
    };
    loading.value = true;
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await ArticleDataService.getAll(feed, offset, limit);
        entities.value = data;
        resolve(data);
      } catch (e: any) {
        console.log(e);
        if (e?.response?.message) {
          openSnackbar({ text: e?.response?.message });
        }
        reject(e);
      } finally {
        loading.value = false;
      }
    });
  }
  return {
    entities,
    getAll,
    loading,
  };
});
