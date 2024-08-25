import * as React from "react";

export type CustomerProps = {
  items: number;
};

export type QueueProps = React.PropsWithChildren & {
  id: string;
  customers: CustomerProps[];
};

export type InsertProps = React.PropsWithChildren;

export const CREATE_RANDOM_CUSTOMER_INTERVAL = 3000;
export const CHECKOUT_SPEED = 1000;
