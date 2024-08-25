import * as React from "react";
import { CustomerProps, QueueProps } from "./types";

export type QueueContextProviderProps = React.PropsWithChildren & {
  seedQueues: QueueProps[];
};

export type QueueContextBag = {
  queues: QueueProps[];
  getQueue: (qid: string) => QueueProps;
  updateQueue: (qid: string, queue: QueueProps) => void;
  insertCustomer: (customer: CustomerProps) => void;
};

const empty: QueueContextBag = {
  queues: [],
  getQueue: () => ({ id: "none", customers: [] }),
  updateQueue: () => {},
  insertCustomer: () => {},
};

export const QueueContext = React.createContext<QueueContextBag>(empty);

// easy to get the fastest queue here, but how to add customers?
// should all queue state be managed here?????
export const QueueContextProvider = ({
  children,
  seedQueues,
}: QueueContextProviderProps) => {
  const [queues, setQueues] = React.useState<QueueProps[]>(seedQueues);

  const getQueue = (qid: string) =>
    queues.find((el) => el.id === qid) || empty.getQueue("none");

  const updateQueue = (qid: string, qUpdated: QueueProps) => {
    const updatedQs = [...queues];
    const qToUpdateIndex = updatedQs.findIndex((el) => el.id === qid);
    if (qToUpdateIndex === -1) {
      console.error(`[QCX] Update Queue not found: ${qid}`);
      return;
    }
    // console.log(`[QCX] Updating ${qid} with:`);
    // console.log(qUpdated);
    // console.log(`[QCX] Queues before:`);
    // console.log(updatedQs);
    // console.log(`[QCX] Queues after:`);
    updatedQs.splice(qToUpdateIndex, 1, qUpdated);
    // console.log(updatedQs);

    setQueues(updatedQs);
  };

  const insertCustomer = (customer: CustomerProps) => {
    const updatedQs = [...queues];

    let smallest = updatedQs.at(0) || { id: "", customers: [] };
    for (let queue of updatedQs) {
      const totalItems = queue.customers.reduce(
        (prevTotal, currTotal) => prevTotal + currTotal.items,
        0
      );
      const currentSmallest = smallest.customers.reduce(
        (prevTotal, currTotal) => prevTotal + currTotal.items,
        0
      );
      if (totalItems < currentSmallest) {
        smallest = queue;
      }
    }

    console.log(`[QCX] Inserting Customer on ${smallest.id}`);
    smallest.customers.push(customer);

    console.log(`[QCX] Queues before:`);
    console.log(updatedQs);

    let index = updatedQs.findIndex((el) => el.id === smallest.id);
    updatedQs.splice(index, 1, smallest);
    console.log(`[QCX] Queues after:`);
    console.log(updatedQs);
    setQueues(updatedQs);
  };
  // NOW, HOW TO HOOK QUEUE COMPONENTS TO THESE CHANGES?!

  return (
    <QueueContext.Provider
      value={{ queues, getQueue, updateQueue, insertCustomer }}>
      {children}
    </QueueContext.Provider>
  );
};
