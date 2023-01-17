<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="3"> Right Sidebar </v-col>
      <v-col>
        <div v-for="(article, j) in entities?.articles" :key="j" class="py-2">
          <v-card
            class="mx-auto"
            prepend-icon="mdi-twitter"
            :title="article.title"
          >
            <template v-slot:prepend>
              <v-icon size="x-large"></v-icon>
            </template>

            <v-card-text class="text-h5 py-2 text-left">
              {{ article.description }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:prepend>
                  <v-avatar
                    color="grey-darken-3"
                    :image="article.author.image"
                  ></v-avatar>
                </template>

                <v-list-item-title class="text-left">{{
                  article.author.username
                }}</v-list-item-title>

                <v-list-item-subtitle class="text-left">{{
                  article.createdAt
                }}</v-list-item-subtitle>

                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon class="mr-1" icon="mdi-heart"></v-icon>
                    <span class="subheading mr-2">{{
                      article.favoritesCount
                    }}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1" icon="mdi-share-variant"></v-icon>
                    <span class="subheading">45</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="3"> Left Sidebar </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useArticleStore } from "../stores/article";
import { onMounted } from "vue";
const { entities } = storeToRefs(useArticleStore());
const { getAll } = useArticleStore();
onMounted(() => {
  getAll();
});
</script>
