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
  //PACKS_FULL: "/packs/:packName/:min/:max/:sortPacks/:page/:pageCount/:user_id/:block",
  EMPTY_PACK: "/empty-pack",
  LEARN_PACK: "/learn-pack/",
  LEARN_PACK_BY_ID: "/learn-pack/:id",
  CARDS_LIST: "/cards-list/",
  CARDS_LIST_BY_ID: "/cards-list/:id",
} as const;

export default PATH;
