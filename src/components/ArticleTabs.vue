<template>
  <v-card>
    <v-toolbar color="primary">
      <template v-slot:extension>
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab v-for="tab in headerFiltered" :key="tab.id" :value="tab.id">
            {{ tab.txt }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item
        v-for="tab in headerFiltered"
        :key="tab.id"
        :value="tab.id"
      >
        <v-card flat>
          <div
            v-for="(article, index) in props.content.articles"
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
          <div class="p-4 text-center" v-if="loading">Loading articles...</div>
          <div
            class="p-4 text-center"
            v-if="!props.content.articlesCount && !loading"
          >
            No articles are here... yet.
          </div>
          <v-pagination
            v-model="page"
            :length="totalPage"
            :total-visible="7"
            v-if="props.content.articlesCount"
          ></v-pagination>
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch, computed, defineProps, defineEmits } from "vue";
import ArticleItem from "./ArticleItem.vue";
import { storeToRefs } from "pinia";

import { useUserStore } from "../stores/user";
import { Article, ArticleTabHeader } from "@/types";

interface Props {
  headers: ArticleTabHeader[];
  content: {
    articles: Article[];
    articlesCount: number;
  };
  loading?: boolean;
  tab?: string;
  limit?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["change"]);
const { isAuthorized } = storeToRefs(useUserStore());

const page = ref<number>(1);
const headerFiltered = computed<ArticleTabHeader[]>(() =>
  isAuthorized ? props.headers : props.headers.filter((i) => !i.requiresAuth)
);
const tab = ref<string | null>(props.tab ?? headerFiltered.value[0].id);
const articleLimit = ref<number>(props.limit ?? 10);
const pageOffset = computed<number>(
  () => (page.value - 1) * articleLimit.value
);
watch(
  [tab, page],
  () => {
    emit("change", tab.value, pageOffset.value, articleLimit.value);
  },
  { immediate: true }
);
const totalPage = computed<number>(() =>
  props.content.articlesCount
    ? Math.ceil(props.content.articlesCount / articleLimit.value)
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
