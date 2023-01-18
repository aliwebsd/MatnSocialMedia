<template>
  <v-card
    class="mx-auto"
    prepend-icon="mdi-twitter"
    :title="props.article.title"
  >
    <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template>

    <v-card-text class="text-h5 py-2 text-left">
      {{ props.article.description }}
    </v-card-text>

    <v-card-actions>
      <v-list class="w-100" lines="one">
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              :image="props.article.author.image"
            ></v-avatar>
          </template>

          <v-list-item-title class="text-left">{{
            props.article.author.username
          }}</v-list-item-title>

          <v-list-item-subtitle class="text-left">{{
            props.article.createdAt
          }}</v-list-item-subtitle>

          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="mr-1" icon="mdi-heart"></v-icon>
              <span class="subheading mr-2">{{
                props.article.favoritesCount
              }}</span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1" icon="mdi-share-variant"></v-icon>
              <span class="subheading">45</span>
            </div>
          </template>
        </v-list-item>
        <v-list-item class="w-100">
          <div class="w-100 d-flex justify-space-between">
            <v-btn
              variant="text"
              color="teal-accent-4"
              :href="`article/${props.article.slug}`"
            >
              Read more...
            </v-btn>
            <div class="d-flex">
              <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                :href="`article/${props.article.slug}`"
                v-for="tag in props.article.tagList"
                :key="tag"
              >
                {{ tag }}
              </v-btn>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import type { Article } from "@/types";
interface Props {
  article: Article;
}

const props = defineProps<Props>();
</script>
