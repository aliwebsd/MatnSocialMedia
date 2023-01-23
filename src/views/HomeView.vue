<template>
  <v-container>
    <div class="d-flex flex-wrap flex-col-reverse md:flex-row">
      <div class="basis-full md:basis-8/12 p-2">
        <ArticleTabs
          :headers="tabs"
          :content="entities"
          :loading="loading"
          @change="getAll"
        />
      </div>
      <div class="basis-full md:basis-4/12 p-2"><TagList /></div>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import ArticleTabs from "@/components/ArticleTabs.vue";
import TagList from "@/components/TagList.vue";
import { ArticleTabHeader } from "@/types";
import { useArticleStore } from "@/stores/article";
import { storeToRefs } from "pinia";

const { getAll } = useArticleStore();
const { entities, loading } = storeToRefs(useArticleStore());
const tabs = ref<ArticleTabHeader[]>([
  { id: "feed", txt: "My feed", requiresAuth: true },
  { id: "", txt: "Global feed" },
]);
</script>
