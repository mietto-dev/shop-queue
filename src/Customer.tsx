import { CustomerProps } from "./types";

export const Customer = ({ items }: CustomerProps) => {
  return (
    <>
      <div
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          border: "2px solid white",
          margin: "0.2rem",
          alignContent: "center",
        }}>
        {items}
      </div>
    </>
  );
};
