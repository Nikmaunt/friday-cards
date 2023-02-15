const PATH = {
  LOGIN: "/friday-cards/login",
  PROFILE: "/friday-cards/profile",
  FORGOT_PASSWORD: "/friday-cards/forgot-password",
  CHECK_EMAIL: "/friday-cards/check-email",
  SET_NEW_PASSWORD: "/friday-cards/set-new-password/:token",
  PACKS: "/friday-cards/packs",
  CARDS_LIST: "/friday-cards/cards-list/:id",
} as const;

export default PATH;
