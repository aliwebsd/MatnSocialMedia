<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="3"> Right Sidebar </v-col>
      <v-col>
        <ArticleView />
      </v-col>
      <v-col cols="3"> Left Sidebar </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import ArticleView from "@/components/ArticleTabs.vue";
</script>
