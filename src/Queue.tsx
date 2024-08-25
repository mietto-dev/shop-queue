import * as React from "react";
import { Customer } from "./Customer";
import { CHECKOUT_SPEED, CustomerProps, QueueProps } from "./types";
import { QueueContext } from "./QueueContext";

export const Queue = ({ id }: QueueProps) => {
  // initial customers, seeded via props

  // QueueContext version
  const { updateQueue, getQueue } = React.useContext(QueueContext);
  const { customers: actualCustomers } = getQueue(id);

  // Local state version
  // const [actualCustomers, setActualCustomers] = React.useState(customers);

  const [isProcessing, setIsProcessing] = React.useState(false);

  // wire up

  const handleProcessItem = () => {
    // control variables
    const hasCustomer = actualCustomers.length > 0;
    const hasCustomerFinished =
      hasCustomer && Number(actualCustomers.at(0)?.items) === 0;
    const hasProducts = hasCustomer && Number(actualCustomers.at(0)?.items) > 0;

    // no customers
    if (!hasCustomer) {
      // setIsProcessing(false);
      return;
    }

    // DEBUG LOGS
    // console.log(`[QUE-${id}] actualCustomers:`);
    // console.log(actualCustomers);
    // console.log(`[QUE-${id}] hasCustomer, hasCustomerFinished, hasProducts:`);
    // console.log(hasCustomer, hasCustomerFinished, hasProducts);

    // customer finished (0 products) => remove from queue
    if (hasCustomerFinished) {
      const updatedCustomers = JSON.parse(JSON.stringify(actualCustomers));
      updatedCustomers.splice(0, 1);

      console.log(
        `[QUE-${id}] Customer finished. Total Customers: ${actualCustomers.length} -> ${updatedCustomers.length}`
      );

      updateQueue(id, { id, customers: updatedCustomers });
      // setActualCustomers(updatedCustomers);
      return;
    }

    // next customer still has items => remove 1 item
    if (hasProducts) {
      // const updatedCustomers = [...actualCustomers];
      const updatedCustomers = JSON.parse(JSON.stringify(actualCustomers));
      updatedCustomers[0].items -= 1;

      console.log(
        `[QUE-${id}] Processing item. Remaining items: ${
          actualCustomers.at(0)?.items
        } -> ${updatedCustomers.at(0)?.items}`
      );

      updateQueue(id, { id, customers: updatedCustomers });
      // setActualCustomers(updatedCustomers);
      return;
    }
  };

  // only way to make isProcessing respond on the correct timing
  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setIsProcessing(false);
  //   }, CHECKOUT_SPEED - 50);
  // }, [isProcessing]);

  // when using setInterval, effect MUST have the state var being changed on the dependency array!
  React.useEffect(() => {
    // console.log(`[QUE-${id}] actualCustomers CHANGED:`);
    // console.log(actualCustomers);
    // setIsProcessing(true);
    // TODO change 1000 to rand between 1000-3000
    const processItemInterval = setInterval(() => {
      handleProcessItem();
    }, CHECKOUT_SPEED);

    return () => {
      // console.log(`Clearing interval on ${id}`);
      clearInterval(processItemInterval);
    };
  }, [actualCustomers]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "1rem",
        }}>
        <div
          style={{
            width: "3rem",
            height: "3rem",
            border: "1px solid white",
            backgroundColor: isProcessing
              ? "rgba(255,255,255,0.3)"
              : "transparent",
          }}>
          {id}
        </div>
        {actualCustomers.map((customer) => (
          <Customer key={`Q${id}-C${crypto.randomUUID()}`} {...customer} />
        ))}
      </div>
    </>
  );
};
