<template>
  <v-card width="100%">
    <template v-slot:title> Popular Tags </template>
    <template v-slot:text>
      <div class="d-flex flex-wrap gap-2">
        <router-link
          v-for="(tag, index) in tags"
          :key="index"
          :to="`/tag/${tag}`"
          custom
        >
          <v-btn size="x-small" color="secondary">{{ tag }}</v-btn>
        </router-link>
        <div v-if="tagsLoading">Loading tags...</div>
        <div v-if="!tagsLoading && !tags.length">Not Found!</div>
      </div>
    </template>
  </v-card>
</template>
<script setup lang="ts">
import { useTags } from "@/composables/useTags";
const { tags, tagsLoading, fetchTags } = useTags();
fetchTags();
</script>
