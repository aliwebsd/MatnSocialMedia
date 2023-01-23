<template>
  <v-card class="mx-auto" :title="props.article.title">
    <!-- prepend-icon="mdi-twitter" -->
    <!-- <template v-slot:prepend>
      <v-icon size="x-large"></v-icon>
    </template> -->

    <v-card-text class="py-2 text-left">
      {{ props.article.description }}
    </v-card-text>

    <v-card-actions>
      <v-list class="w-100" lines="one">
        <v-list-item class="w-100">
          <template v-slot:prepend>
            <router-link :to="`/profile/${props.article.author.username}`">
              <v-avatar
                color="grey-darken-3"
                :image="props.article.author.image"
                size="small"
              ></v-avatar>
            </router-link>
          </template>

          <v-list-item-title class="text-left pl-4">
            <router-link :to="`/profile/${props.article.author.username}`">
              {{ props.article.author.username }}
            </router-link></v-list-item-title
          >

          <v-list-item-subtitle class="text-left pl-4">{{
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
            <router-link
              variant="text"
              color="teal-accent-4"
              :to="`article/${props.article.slug}`"
            >
              Read more...
            </router-link>
            <div class="d-flex">
              <v-btn
                class="ms-2"
                variant="outlined"
                size="small"
                :to="`article/${props.article.slug}`"
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
