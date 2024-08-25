import * as React from "react";
import { CREATE_RANDOM_CUSTOMER_INTERVAL, InsertProps } from "./types";
import { Generate } from "./utils";
import "./Insert.css";
import { QueueContext } from "./QueueContext";

export const Insert = () => {
  const [insertRandom, setInsertRandom] = React.useState(false);

  const { insertCustomer } = React.useContext(QueueContext);

  React.useEffect(() => {
    // console.log(`[INS] Random changed: ${insertRandom}`);

    if (insertRandom) {
      const randomInsertInterval = setInterval(() => {
        const customer = Generate.customer();
        insertCustomer(customer);
      }, CREATE_RANDOM_CUSTOMER_INTERVAL);

      return () => {
        clearInterval(randomInsertInterval);
      };
    }
  }, [insertRandom]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent browser reload
    e.preventDefault();

    // type cohercion
    const form = e.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      insertCustomerInput: { value: number };
    };
    const value = formElements.insertCustomerInput.value;

    // logging and callback
    console.log(`[INS] Inserting custumer with: ${value}`);
    const customer = Generate.customer(value);
    insertCustomer(customer);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h3>Insert Customer</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-col">
              <label htmlFor="insertCustomerInput">Items:</label>
              <input
                style={{ display: "flex", width: "100%", padding: "0.8rem" }}
                id="insertCustomerInput"
                type="number"
                required
                min={0}
                max={30}
                step={1}
              />
            </div>
            <div
              className="form-col"
              style={{
                alignItems: "flex-end",
                justifyContent: "flex-end",
                textAlign: "right",
              }}>
              <label>
                <input
                  id="insertCustomerRandom"
                  type="checkbox"
                  checked={insertRandom}
                  onChange={(ev) => {
                    setInsertRandom(ev.target.checked);
                  }}
                />
                Insert random customers?
              </label>
            </div>
          </div>
          <div className="form-row" style={{ justifyContent: "flex-end" }}>
            <button type="submit">Insert</button>
          </div>
        </form>
      </div>
    </>
  );
};
