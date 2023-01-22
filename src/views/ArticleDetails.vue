<template>
  <div v-if="article">
    <div class="bg-[#333] text-white">
      <v-container>
        <v-row>
          <v-col>
            <h1 class="text-h5 font-weight-bold">{{ article.title }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-list-item class="w-100">
              <template v-slot:prepend>
                <v-avatar
                  color="grey-darken-3"
                  :image="article.author.image"
                ></v-avatar>
              </template>

              <v-list-item-title>{{
                article.author.username
              }}</v-list-item-title>

              <v-list-item-subtitle>{{
                new Date(article.createdAt).toLocaleDateString()
              }}</v-list-item-subtitle>

              <template v-slot:append>
                <div class="d-flex justify-self-end gap-2">
                  <v-btn
                    @click="setFollowAuthor(true)"
                    color="gray"
                    variant="tonal"
                    size="small"
                    :loading="followLoading"
                    :disabled="followLoading"
                    v-if="
                      isAuthorized &&
                      article.author.following &&
                      user.username !== article.author.username
                    "
                    >- unFollow {{ article.author.username }}</v-btn
                  >
                  <v-btn
                    @click="setFollowAuthor(false)"
                    class="text-secodary-100 border-secodary-100 hover:bg-secodary-100 hover:text-white"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-plus"
                    :loading="followLoading"
                    :disabled="followLoading"
                    v-else-if="
                      isAuthorized && user.username !== article.author.username
                    "
                    >Follow {{ article.author.username }}</v-btn
                  >
                  <v-btn
                    @click="setFavoriteArticle(false)"
                    class="text-secodary-200 border-secodary-200 hover:bg-secodary-200 hover:text-white"
                    variant="tonal"
                    size="small"
                    color="primary"
                    prepend-icon="mdi-cards-heart"
                    :loading="favoriteArticleLoading"
                    :disabled="favoriteArticleLoading"
                    v-if="isAuthorized && article.favorited"
                    >Unfavorite Article ({{ article.favoritesCount }})</v-btn
                  >
                  <v-btn
                    @click="setFavoriteArticle(true)"
                    class="text-secodary-200 border-secodary-200 hover:bg-secodary-200 hover:text-white"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-cards-heart"
                    :loading="favoriteArticleLoading"
                    :disabled="favoriteArticleLoading"
                    v-else
                    >Favorite Article ({{ article.favoritesCount }})</v-btn
                  >
                  <v-btn
                    @click="editArticle"
                    class="text-secodary-200 border-secodary-200 hover:bg-secodary-200 hover:text-white"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-pencil"
                    v-if="user.username === article.author.username"
                    >Edit Article</v-btn
                  >
                  <v-btn
                    @click="deleteArticle(article.slug)"
                    class="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                    variant="outlined"
                    size="small"
                    prepend-icon="mdi-delete"
                    v-if="user.username === article.author.username"
                    >Delete Article</v-btn
                  >
                </div>
              </template>
            </v-list-item>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row>
          <v-col>
            {{ article.body }}
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex gap-2">
              <v-btn
                variant="outlined"
                size="small"
                v-for="(tag, index) in article.tagList"
                :key="index"
              >
                {{ tag }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-if="isAuthorized">
      <v-container>
        <v-row>
          <v-col>
            <v-card class="mx-auto" max-width="100%">
              <v-textarea
                v-model="newComment"
                label="Write a comment..."
                hide-details
              ></v-textarea>
              <v-card-actions class="bg-secodary-300">
                <v-container>
                  <v-row class="px-4">
                    <v-avatar
                      size="small"
                      color="grey-darken-3"
                      :image="user.image"
                    ></v-avatar>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="postComment"
                      :loading="createCommentLoading"
                      :disabled="createCommentLoading"
                      color="primary"
                      variant="tonal"
                    >
                      Post Comment
                    </v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pt-4">
          <v-col class="gap-2 d-flex flex-col" v-if="state.comments.length">
            <v-card
              class="w-full"
              max-width="100%"
              v-for="(comment, index) in state.comments"
              :key="comment.id"
            >
              <div class="p-6">
                <p>{{ comment.body }}</p>
              </div>
              <v-card-actions class="bg-secodary-300">
                <v-container>
                  <v-row align="center" class="px-4 gap-2">
                    <v-avatar
                      size="x-small"
                      color="grey-darken-3"
                      :image="comment.author.image"
                    ></v-avatar>
                    <span color="primary">{{ comment.author.username }}</span>
                    <span class="text-secodary-400 text-sm-caption">{{
                      new Date(comment.createdAt).toLocaleDateString()
                    }}</span>
                    <v-spacer></v-spacer>
                    <v-btn
                      @click="deleteComment(comment.id, index)"
                      :loading="deleteCommentLoading[index]"
                      :disabled="deleteCommentLoading[index]"
                      icon="mdi-delete"
                      size="small"
                    ></v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col v-else-if="commentsloading"
            >Article comments is loading...</v-col
          >
          <v-col v-else>No Comments!</v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else>
      <v-container>
        <v-row>
          <v-col
            ><router-link to="/login">Sign in</router-link> or
            <router-link to="/register">sign up</router-link> to add comments on
            this article.</v-col
          >
        </v-row>
      </v-container>
    </div>
  </div>
  <div v-else-if="getArticleLoading">
    <v-container>
      <v-row>
        <v-col>Article is Loading...</v-col>
      </v-row>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-row>
        <v-col>404 Article Not Found!</v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import ArticleDataService from "@/services/article";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { Comment } from "@/types";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
import { useSnackbarStore } from "@/stores/snackbar";
import { useProfile } from "@/composables/useProfile";
import { useArticle } from "@/composables/useArticle";
const { openSnackbar } = useSnackbarStore();
const { isAuthorized, user } = storeToRefs(useUserStore());
const route = useRoute();
const router = useRouter();
const commentsloading = ref<boolean>(false);
const newComment = ref<string>("");
const createCommentLoading = ref<boolean>(false);
const deleteCommentLoading = ref<{ [key: number]: boolean }>({});
const { getArticle, article, getArticleLoading } = useArticle();
const { follow, followLoading } = useProfile();
const state = reactive<{ comments: Comment[] }>({
  comments: [],
});

// Get Article Detail
getArticle(route.params.slug as string);

// Get Article Comments
(async () => {
  commentsloading.value = true;
  const { data } = await ArticleDataService.getComments(
    route.params.slug as string
  );
  state.comments = data.comments;
  commentsloading.value = false;
})();

const postComment = async () => {
  try {
    createCommentLoading.value = true;
    const response = await ArticleDataService.postComment(
      route.params.slug as string,
      newComment.value
    );
    openSnackbar({ text: "Comment succesfuly posted!" });
    newComment.value = "";
    state.comments.push(response.data.comment);
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      openSnackbar({ text: e?.response?.data });
    }
  } finally {
    createCommentLoading.value = false;
  }
};

const deleteComment = async (commentID: number, index: number) => {
  try {
    deleteCommentLoading.value[commentID] = true;
    await ArticleDataService.deleteComment(
      route.params.slug as string,
      commentID
    );
    openSnackbar({ text: "Comment succesfuly deleted!" });
    state.comments.splice(index, 1);
    delete deleteCommentLoading.value[commentID];
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      openSnackbar({ text: e?.response?.data });
    }
  } finally {
    deleteCommentLoading.value[commentID] = false;
  }
};
const favoriteArticleLoading = ref<boolean>(false);
const setFavoriteArticle = async (isFav: boolean) => {
  if (isAuthorized.value) {
    try {
      favoriteArticleLoading.value = true;
      const response = await ArticleDataService.favorite(
        route.params.slug as string,
        isFav
      );
      openSnackbar({
        text: `Aricle succesfuly ${isFav ? "favorited" : "unfavorited"}!`,
      });
      if (article.value) {
        article.value.favorited = response.data.article.favorited;
        // article.value = response.data.article;
      }
    } catch (e) {
      console.log(e);
      openSnackbar({ text: e?.response?.data?.message || "Error!" });
    } finally {
      favoriteArticleLoading.value = false;
    }
  } else {
    router.push("/login");
  }
};
const setFollowAuthor = async (isFollowing: boolean) => {
  if (article.value) {
    article.value.author.following = (await follow(
      article.value.author.username,
      isFollowing
    )) as boolean;
  }
};
const editArticle = () => {
  router.push(`/article/${route.params.slug}/edit`);
};
</script>
