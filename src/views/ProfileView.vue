<template>
  <div>
    <div
      v-if="profile"
      class="bg-secodary-500 text-white pt-8 pb-4 text-center"
    >
      <v-container>
        <v-row>
          <v-col>
            <v-avatar color="grey-darken-3" size="100">
              <v-img
                v-if="profile.image"
                alt="Avatar"
                :src="profile.image"
              ></v-img>
              <v-icon
                v-else
                color="grey-darken-3"
                icon="mdi-account-circle"
              ></v-icon>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h1 class="text-[#373a3c] text-h5 font-weight-bold">
              {{ profile.username }}
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              @click="editProfleSetting"
              class="text-secodary-600 border-secodary-600"
              variant="outlined"
              size="small"
              color="#999"
              prepend-icon="mdi-cog"
              >Edit profile settings</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row>
          <v-col>
            <ArticleTabs
              :headers="tabs"
              :content="entities"
              :loading="loading"
              @change="getAll"
            />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProfile } from "@/composables/useProfile";
import ArticleTabs from "@/components/ArticleTabs.vue";
import { ArticleTabHeader } from "@/types";
import { useArticleStore } from "@/stores/article";
import { storeToRefs } from "pinia";

const route = useRoute();
const router = useRouter();
const { getProfile, profile, getProfileLoading } = useProfile();
const { username } = route.params;
getProfile(username);
function editProfleSetting() {
  router.push("/settings");
}

const { getAll } = useArticleStore();
const { entities, loading } = storeToRefs(useArticleStore());
const tabs = ref<ArticleTabHeader[]>([
  { id: `?author=${username}`, txt: "My articles" },
  { id: `?favorited=${username}`, txt: "Favorited Articles" },
]);
</script>
