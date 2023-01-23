import http from "./http-common";
import { Profile } from "@/types";

class ProfileDataService {
  follow(
    username: string,
    unfollow: boolean
  ): Promise<{ data: { profile: Profile }; status: number }> {
    if (unfollow) {
      return http.delete(`/profiles/${username}/follow`);
    } else {
      return http.post(`/profiles/${username}/follow`);
    }
  }
  profile(username: string) {
    return http.get(`/profiles/${username}`);
  }
}

export default new ProfileDataService();
