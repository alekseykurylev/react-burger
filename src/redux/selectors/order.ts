import { RootState } from "../store";

const selectOrder = (store: RootState) => store.order;

export default selectOrder;
