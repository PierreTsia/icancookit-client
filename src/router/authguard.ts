import store from "./../store/index";
//eslint-disable-next-line
export default async (to: any, from: any, next: Function) => {
  await store.dispatch("getCurrentUser");
  //await store.dispatch("getMyBoards");
};
