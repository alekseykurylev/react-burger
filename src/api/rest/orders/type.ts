export interface IOrdersResponse {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export interface IOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface IOrdersNumberResponse {
  orders: IOrder[];
  success: boolean;
}
