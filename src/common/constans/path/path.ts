// const PATH = {
//   LOGIN: "/friday-cards/login",
//   PROFILE: "/friday-cards/profile",
//   FORGOT_PASSWORD: "/friday-cards/forgot-password",
//   CHECK_EMAIL: "/friday-cards/check-email",
//   SET_NEW_PASSWORD: "/friday-cards/set-new-password/:token",
//   PACKS: "/friday-cards/packs",
//   CARDS_LIST: "/friday-cards/cards-list/:id",
// } as const;

const PATH = {
  LOGIN: "/login",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgot-password",
  CHECK_EMAIL: "/check-email",
  SET_NEW_PASSWORD: "/set-new-password/:token",
  PACKS: "/packs",
  EMPTY_PACK: "/empty-pack",
  LEARN_PACK: "/learn-pack/",
  LEARN_PACK_BY_ID: "/learn-pack/:id",
  CARDS_LIST: "/cards/",
} as const;

export default PATH;
