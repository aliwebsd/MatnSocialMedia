import { ref } from "vue";
import ProfileDataService from "@/services/profile";
import { useSnackbarStore } from "@/stores/snackbar";
import { Profile } from "@/types";

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

  const profile = ref<Profile>();
  const getProfileLoading = ref<boolean>(false);
  async function getProfile(username: string) {
    try {
      getProfileLoading.value = true;
      profile.value = (await ProfileDataService.profile(username)).data.profile;
    } catch (e) {
      console.log(e);
    } finally {
      getProfileLoading.value = false;
    }
  }
  return {
    follow,
    followLoading,
    getProfile,
    profile,
    getProfileLoading,
  };
}
