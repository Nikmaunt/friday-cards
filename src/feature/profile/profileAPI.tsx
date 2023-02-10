import { instance } from "../../app/appAPI";

export const profileAPI = {
  updateUserName(name: string) {
    return instance.put("/auth/me", { name });
  },
};
