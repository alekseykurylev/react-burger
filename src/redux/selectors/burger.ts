import { RootState } from "../store";

const selectBurger = (store: RootState) => store.burger;

export default selectBurger;
