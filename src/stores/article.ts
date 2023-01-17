import { defineStore } from "pinia";
import ArticleDataService from "../services/articles";
import { ref } from "vue";

export const useArticleStore = defineStore("article", () => {
  const entities = ref<any>({});

  async function getAll() {
    const { data } = await ArticleDataService.getAll();
    console.log(data);
    entities.value = data;
  }
  return {
    entities,
    getAll,
  };
});
