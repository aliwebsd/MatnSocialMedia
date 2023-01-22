import { ref } from "vue";
import ArticleDataService from "@/services/article";
export function useTags() {
  const tags = ref<string[]>([]);
  const tagsLoading = ref<boolean>(false);
  const fetchTags = async () => {
    tags.value = [];
    tagsLoading.value = true;
    const { data } = await ArticleDataService.getTags();
    tags.value = data.tags;
    tagsLoading.value = false;
  };
  return {
    tags,
    tagsLoading,
    fetchTags,
  };
}
