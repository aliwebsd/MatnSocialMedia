<template>
  <v-card>
    <v-toolbar color="primary">
      <template v-slot:extension>
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab v-for="tab in tabs" :key="tab" :value="tab">
            {{ tab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item v-for="tab in tabs" :key="tab" :value="tab">
        <v-card flat>
          <div v-for="(article, j) in entities?.articles" :key="j" class="py-2">
            <ArticleItem :article="article" />
          </div>
          <div v-if="loading">Loading articles...</div>
          <div v-if="!entities?.articlesCount && !loading">
            No articles are here... yet.
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import ArticleItem from "./ArticleItem.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/article";
import { useUserStore } from "../stores/user";
const { entities, loading } = storeToRefs(useArticleStore());
const { isAuthorized } = storeToRefs(useUserStore());
const { getAll } = useArticleStore();

const tab = ref<string | null>(isAuthorized.value ? "global-feed" : "my-feed");
const tabs = ref<string[]>(
  isAuthorized.value ? ["my-feed", "global-feed"] : ["global-feed"]
);
watchEffect(() => {
  getAll(tab.value === "my-feed", 0);
});
</script>
