import { RootState } from "../store";

const selectAuth = (store: RootState) => store.auth;

export default selectAuth;
