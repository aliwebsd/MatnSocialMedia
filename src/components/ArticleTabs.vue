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
          <div
            v-for="(article, index) in entities.articles"
            :key="index"
            class="py-2"
          >
            <ArticleItem :article="article" />
          </div>
          <!-- <Grid
            :length="197"
            :pageSize="articleLimit"
            :pageProvider="pageProvider"
            class="grid"
          >
            <template v-slot:probe>
              <div class="item">Probe</div>
            </template> -->

          <!-- When the item is not loaded, a placeholder is rendered -->
          <!-- <template v-slot:placeholder="{ index, style }">
              <div class="item" :style="style">Placeholder {{ index }}</div>
            </template> -->

          <!-- Render a loaded item -->
          <!-- <template v-slot:default="item"> -->
          <!-- item, style, index -->
          <!-- <div class="item" :style="style">{{ item }} {{ index }}</div> -->
          <!-- {{ JSON.stringify(item) }} -->
          <!-- <ArticleItem :article="item" /> -->
          <!-- </template>
          </Grid> -->
          <div v-if="loading">Loading articles...</div>
          <div v-if="!entities.articlesCount && !loading">
            No articles are here... yet.
          </div>
          <v-pagination
            v-model="page"
            :length="totalPage"
            :total-visible="7"
          ></v-pagination>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import ArticleItem from "./ArticleItem.vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/article";
import { useUserStore } from "../stores/user";

const { entities, loading } = storeToRefs(useArticleStore());
const { isAuthorized } = storeToRefs(useUserStore());
const { getAll } = useArticleStore();

const tab = ref<string | null>(isAuthorized.value ? "my-feed" : "global-feed");
const tabs = ref<string[]>(
  isAuthorized.value ? ["my-feed", "global-feed"] : ["global-feed"]
);
const page = ref<number>(1);
const articleLimit = ref<number>(10);
const isFeed = computed<boolean>(() => tab.value === "my-feed");
const pageOffset = computed<number>(
  () => (page.value - 1) * articleLimit.value
);
watch(
  [isFeed, page],
  () => {
    getAll(isFeed.value, pageOffset.value, articleLimit.value);
  },
  { immediate: true }
);
const totalPage = computed<number>(() =>
  entities.value.articlesCount
    ? Math.ceil(entities.value.articlesCount / articleLimit.value)
    : 0
);
// const pageProvider = (pageNumber: number, pageSize: number) =>
//   // eslint-disable-next-line no-async-promise-executor
//   new Promise(async (resolve, reject) => {
//     try {
//       const { articles } = await getAll(isFeed.value, pageNumber, pageSize);
//       debugger;
//       resolve(articles);
//     } catch (e) {
//       console.log(e);
//       reject(e);
//     }
//   });
</script>
