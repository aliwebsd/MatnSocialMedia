<template>
  <v-container>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="5">
        <div class="d-flex flex-column align-center justify-center pb-4">
          <h1>Sign up</h1>
          <router-link to="/login">Have an account?</router-link>
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="user.username"
            label="Username"
            required
          ></v-text-field>
          <!-- :rules="nameRules" -->
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
          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-row>
            <v-spacer />
            <v-btn color="primary" class="me-4" @click="submit">
              Sign up
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import UserDataService from "../services/user";
const valid = ref(false);
const checkbox = ref(false);
const user = reactive({
  username: "",
  email: "",
  password: "",
});
const rules = reactive({
  email: [
    (v: string) => !!v || "E-mail is required",
    (v: string) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ],
});
const submit = async () => {
  console.log(user);
  const { data } = await UserDataService.create({ user });
  console.log(data);
};
</script>
