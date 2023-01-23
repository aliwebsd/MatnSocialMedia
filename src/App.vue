<template>
  <div>
    <v-toolbar dark prominent>
      <v-container>
        <v-row no-gutters align="center">
          <!-- image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg" -->
          <v-toolbar-title>
            <router-link to="/">Matn Social</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <nav class="d-flex" style="gap: 10px">
            <router-link to="/">Home</router-link>
            <router-link to="/login" v-if="!isAuthorized">Sign in</router-link>
            <router-link to="/article/create" v-if="isAuthorized"
              >New Article</router-link
            >
            <router-link to="/settings" v-if="isAuthorized"
              >Settings</router-link
            >
            <router-link to="/register" v-if="!isAuthorized"
              >Sign up</router-link
            >
            <router-link :to="`/@${user?.username}`" v-if="isAuthorized">{{
              user?.username
            }}</router-link>
          </nav>
        </v-row>
      </v-container>
    </v-toolbar>
  </div>
  <router-view />
  <v-snackbar v-model="snackbar.isOpen" :timeout="snackbar.timeout">
    {{ snackbar.text }}
    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="closeSnackbar"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSnackbarStore } from "@/stores/snackbar";
import { useUserStore } from "@/stores/user";
const { snackbar } = storeToRefs(useSnackbarStore());
const { isAuthorized, user } = storeToRefs(useUserStore());
const { closeSnackbar } = useSnackbarStore();
</script>
<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #373a3c;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
