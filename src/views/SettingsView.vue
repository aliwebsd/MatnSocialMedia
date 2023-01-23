<template>
  <v-container>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="10" lg="8" xl="5">
        <div class="d-flex flex-column align-center justify-center pb-4">
          <h2 class="text-h4">Your Settings</h2>
        </div>
        <v-form ref="formRef" v-model="valid" lazy-validation>
          <v-text-field
            v-model="userSetting.image"
            label="Profile picture"
          ></v-text-field>
          <v-text-field
            v-model="userSetting.username"
            label="Username"
            :rules="rules.required"
            required
          ></v-text-field>
          <v-textarea v-model="userSetting.bio" label="Bio"></v-textarea>
          <!-- :rules="nameRules" -->
          <v-text-field
            v-model="userSetting.email"
            label="E-mail"
            :rules="rules.email"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="userSetting.password"
            label="Password"
          ></v-text-field>
          <v-row>
            <v-spacer />
            <v-btn
              @click="submit"
              color="primary"
              class="me-4"
              :disabled="!valid"
              :loading="userUpdateLoading"
            >
              Update Settings
            </v-btn>
          </v-row>
        </v-form>
        <div>
          <v-btn
            @click="logout"
            color="#999"
            variant="outlined"
            size="small"
            prepend-icon="mdi-logout"
            >Or click here to logout</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, ref, watch, onMounted } from "vue";
import { User, UserSetting } from "@/types";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const { update, logout } = useUserStore();
const { user, userUpdateLoading } = storeToRefs(useUserStore());
const valid = ref(false);
const formRef = ref<HTMLInputElement | null>(null);
const userSetting = ref<UserSetting>({
  image: "",
  username: "",
  bio: "",
  email: "",
  password: "",
});
onMounted(() => {
  watch(
    user,
    (val: User) => {
      const userCopy = { ...val };
      delete userCopy.token;
      userSetting.value = {
        ...userCopy,
        password: "",
      };
      formRef.value?.validate();
    },
    { immediate: true }
  );
});
const rules = reactive({
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ],
  required: [(v: string) => !!v || "Field is required"],
});
const submit = () => {
  update(userSetting);
};
</script>
