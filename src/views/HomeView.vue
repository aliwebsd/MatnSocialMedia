<template>
  <v-container>
    <v-row no-gutters class="gap-4">
      <v-col>
        <ArticleTabs />
      </v-col>
      <v-col cols="3"> <TagList /> </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ArticleTabs from "@/components/ArticleTabs.vue";
import TagList from "@/components/TagList.vue";
</script>
