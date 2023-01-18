<template>
  <v-container>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="5">
        <div class="d-flex flex-column align-center justify-center pb-4">
          <h1>Sign in</h1>
          <router-link to="/register">Need an account?</router-link>
        </div>
        <ul class="error-messages">
          <li v-for="(error, field) in errors" :key="field">
            {{ field }} {{ error ? error[0] : "" }}
          </li>
        </ul>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.email"
            :rules="rules.email"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="user.password"
            label="Password"
            required
          ></v-text-field>
          <v-row>
            <v-spacer />
            <v-btn color="primary" class="me-4" @click="submit">
              Sign in
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/user";
const { login } = useUserStore();
const valid = ref(false);
const user = reactive({
  email: "",
  password: "",
});
const errors = ref();
const rules = reactive({
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ],
});
const submit = async () => {
  errors.value = {};
  try {
    await login({ user });
  } catch (e) {
    errors.value = e.response.data?.errors;
  }
};
</script>
