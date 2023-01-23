<template>
  <v-container>
    <v-row no-gutters class="gap-4">
      <v-col>
        <ArticleTabs
          :headers="tabs"
          :content="entities"
          :loading="loading"
          @change="getAll"
        />
      </v-col>
      <v-col cols="3"> <TagList /> </v-col>
    </v-row>
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
