<template>
  <v-container>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="10" lg="8" xl="5">
        <ul class="error-messages">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : "" }}
          </li>
        </ul>
        <v-form ref="formRef" v-model="valid" lazy-validation>
          <v-text-field
            v-model="article.title"
            :rules="rules.required"
            label="Title"
            required
          ></v-text-field>
          <v-text-field
            v-model="article.description"
            label="Description"
            :rules="rules.required"
            required
          ></v-text-field>
          <v-textarea v-model="article.body" label="Body"></v-textarea>
          <!-- :items="items" -->
          <v-combobox
            v-model="article.tagList"
            chips
            clearable
            label="Tags"
            multiple
            prepend-icon="mdi-filter-variant"
            variant="solo"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :model-value="selected"
                closable
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong
                >&nbsp;
                <span>(interest)</span>
              </v-chip>
            </template>
          </v-combobox>
          <v-row>
            <v-spacer />
            <v-btn
              :color="valid ? 'primary' : 'grey'"
              class="me-4"
              @click="submit"
              :loading="loading"
              :disabled="!valid"
            >
              Publish article
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import ArticleDataService from "@/services/article";
import { ArticleForm } from "@/types";
import { useSnackbarStore } from "@/stores/snackbar";
import { useRoute, useRouter } from "vue-router";
import type { Article } from "@/types";
const { openSnackbar } = useSnackbarStore();
import { useArticle } from "@/composables/useArticle";
const valid = ref<boolean>(false);
const article = reactive<ArticleForm>({
  title: "",
  description: "",
  tagList: [],
  body: "",
});
const route = useRoute();
const router = useRouter();
const formRef = ref<HTMLInputElement | null>(null);
const errors = ref();
const loading = ref<boolean>(false);
const { getArticle, article: articleItem } = useArticle();
const rules = reactive({
  required: [(v: string) => !!v || "Field is required"],
});
const remove = (item: string) => {
  article.tagList.splice(article.tagList.indexOf(item), 1);
  article.tagList = [...article.tagList];
};
const submit = async () => {
  errors.value = {};
  try {
    loading.value = true;
    const res = await ArticleDataService.create({ article });
    console.log(res);
    openSnackbar({ text: "Article Publish Successfuly" });
    router.push(`/article/${res.data.article.slug}`);
  } catch (e) {
    errors.value = e?.response?.data?.errors;
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  watch(articleItem, (item: Article) => {
    if (item) {
      article.title = item.title;
      article.description = item.description;
      article.tagList = item.tagList;
      article.body = item.body;
      formRef.value?.validate();
    }
  });
});

//Get Article For Edit
getArticle(route.params.slug as string);
</script>
