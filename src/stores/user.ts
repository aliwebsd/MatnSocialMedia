import { User } from "@/types";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import UserDataService from "@/services/user";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(UserDataService.getStorage());
  const isAuthorized = computed(() => user.value !== null);
  const router = useRouter();
  const update = async (userData: { user: User }) => {
    if (userData) {
      const { data } = await UserDataService.update(userData);
      user.value = data.user;
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
          console.log(data);
          debugger;
          UserDataService.setStorage(data.user);
          user.value = data.user;
          resolve(data.user);
          router.push("/");
        } catch (e: any) {
          reject(e);
        } finally {
          loginLoading.value = false;
        }
      });
    }
  };
  return {
    user,
    isAuthorized,
    update,
    login,
  };
});
