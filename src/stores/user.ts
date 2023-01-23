import { User, UserSetting } from "@/types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import UserDataService from "@/services/user";
import { useRouter, useRoute } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(UserDataService.getStorage());
  const isAuthorized = computed(() => user.value !== null);
  const userUpdateLoading = ref<boolean>(false);
  const router = useRouter();
  const route = useRoute();
  const update = async (userSetting: UserSetting) => {
    if (userSetting) {
      try {
        userUpdateLoading.value = true;
        const { data } = await UserDataService.update(userSetting);
        if (user.value) {
          const newUserData = {
            email: data.user.email,
            token: user.value.token,
            username: data.user.username,
            bio: data.user.bio,
            image: data.user.image,
          };
          user.value = newUserData;
        }
      } catch (e) {
        console.log(e);
      } finally {
        userUpdateLoading.value = false;
      }
    }
  };
  interface Login {
    user: {
      email: string;
      password: string;
    };
  }
  const loginLoading = ref(false);
  const login = (login: Login) => {
    if (login) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        try {
          loginLoading.value = true;
          const { data } = (await UserDataService.login(login)) as {
            data: { user: User };
          };
          UserDataService.setStorage(data.user);
          user.value = data.user;
          resolve(data.user);
          router.push((route.query.redirect as string) ?? "/");
        } catch (e: any) {
          reject(e);
        } finally {
          loginLoading.value = false;
        }
      });
    }
  };
  const logout = () => {
    user.value = null;
    UserDataService.logout();
    router.replace("/");
  };
  return {
    user,
    isAuthorized,
    update,
    login,
    userUpdateLoading,
    logout,
  };
});
