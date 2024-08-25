import { CustomerProps, QueueProps } from "./types";

const Generators = {
  customer: (items?: number): CustomerProps => {
    return { items: !!items ? items : rand(20) };
  },
  queue: (id: string, customers?: CustomerProps[]): QueueProps => {
    return {
      id: !!id ? id : `Q${new Date().getMilliseconds()}`,
      customers: !!customers ? customers : [],
    };
  },
};

const Modifiers = {
  times: (amount: number) => {
    const Modified = {
      bulkCustomers: () => {
        const customers: CustomerProps[] = [];
        for (let i = 0; i < amount; i++) {
          customers.push(Generators.customer());
        }
        return customers;
      },
      bulkQueues: (maxCustomers = 4) => {
        const queues: QueueProps[] = [];
        for (let i = 0; i < amount; i++) {
          const qid = `Q${i + 1}`;
          const queue = Generators.queue(qid);
          // console.log(`[GEN] Generating queue ${qid}...`);

          const customers = Generate.times(
            rand(maxCustomers, 0)
          ).bulkCustomers();
          queue.customers = customers;
          // console.log(`[GEN] Adding ${customers.length} to ${qid}...`);

          queues.push(queue);
        }
        return queues;
      },
    };

    return {
      ...Modified,
    };
  },
};

export const Generate = {
  ...Generators,
  ...Modifiers,
};

export const rand = (upper = 100, lower = 1) => {
  return Math.floor(Math.random() * upper) + lower;
};
