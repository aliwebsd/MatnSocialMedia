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
          <v-col class="d-flex justify-end" v-if="isAuthorized">
            <v-btn
              @click="editProfleSetting"
              class="text-secodary-600 border-secodary-600"
              variant="outlined"
              size="small"
              color="#999"
              prepend-icon="mdi-cog"
              v-if="user.username === profile.username"
              >Edit profile settings</v-btn
            >
            <v-btn
              class="text-secodary-600 border-secodary-600"
              @click="setFollowAuthor(true)"
              color="#999"
              variant="tonal"
              size="small"
              prepend-icon="mdi-minus"
              :loading="followLoading"
              :disabled="followLoading"
              v-if="profile.following && user.username !== profile.username"
              >unFollow {{ profile.username }}</v-btn
            >
            <v-btn
              @click="setFollowAuthor(false)"
              class="text-secodary-600 border-secodary-600"
              variant="outlined"
              size="small"
              color="#999"
              prepend-icon="mdi-plus"
              :loading="followLoading"
              :disabled="followLoading"
              v-else-if="user.username !== profile.username"
              >Follow {{ profile.username }}</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else-if="getProfileLoading">
      <v-container>
        <v-row>
          <v-col>Profile is loading...</v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col>Profile not found!</v-col>
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
import { useUserStore } from "@/stores/user";
import { useArticleStore } from "@/stores/article";
import { storeToRefs } from "pinia";

const { user, isAuthorized } = storeToRefs(useUserStore());
const route = useRoute();
const router = useRouter();
const { getProfile, profile, getProfileLoading, follow, followLoading } =
  useProfile();
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
const setFollowAuthor = async (isFollowing: boolean) => {
  if (profile.value) {
    profile.value.following = (await follow(
      profile.value.username,
      isFollowing
    )) as boolean;
  }
};
</script>
