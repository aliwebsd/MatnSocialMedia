import { ref } from "vue";
import ProfileDataService from "@/services/profile";
import { useSnackbarStore } from "@/stores/snackbar";

export function useProfile() {
  const { openSnackbar } = useSnackbarStore();
  const followLoading = ref<boolean>(false);
  function follow(username: string, unfollow: boolean) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        followLoading.value = true;
        const { data } = await ProfileDataService.follow(username, unfollow);
        resolve(data.profile.following);
        openSnackbar({
          text: `Article author Succesfully ${
            unfollow ? "unfollowed" : "followed"
          }!`,
        });
      } catch (e) {
        console.log(e);
        reject(e);
      } finally {
        followLoading.value = false;
      }
    });
  }
  return {
    follow,
    followLoading,
  };
}
