import { RootState } from "../store";

const selectPasswordReset = (store: RootState) => store.passwordReset;

export default selectPasswordReset;
