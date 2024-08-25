import * as React from "react";
import "./App.css";
import { Queue } from "./Queue";
import { Generate, rand } from "./utils";
import { Insert } from "./Insert";
import { QueueContextProvider } from "./QueueContext";

/** This is our Shop main controller. We'll manage the initial spawning of all entities (Queues, basically),
 * which will in turn manage their own state (number of customers and items) and report back via Context.
 *
 * Entities:
 * - Queues
 * - Customers
 *
 * Controls:
 * - Add Customer form
 *
 * Behavior:
 * - Initial Customers are passed in as props to each queue, who creates the appropriate components.
 * - We'll keep track of those on Queue's state, rerendering appropriately.
 * - Also Reporting back to QueueContext anytime the total number of items change.
 * - The total number of Customers on a Queue could be an extra feature, to resolve Queue size draws
 *
 * Implementation:
 * - [x] Create base entities / components
 * - [x] Generate seed values and test UI display
 * - [x] Model behaviors and entity changes
 * - [x] Add user controls
 * - [ ] Add Queue Context and selection logic
 *
 *
 * A COMPLICAÇÃO DESTA PORRA É ADICIONAR VALORES/PROPS NA RAIZ Q CRIAM OUTROS COMPONENTES
 * VALORES Q INICIALMENTE SÃO PASSADOS VIA PROPS E COMANDAM O RENDER
 * O CORRETO É GERENCIAR TUDO Q ENVOLVE ESTADO GLOBAL NO CONTEXTO
 * ESTA É A ARMADILHA
 */
function App() {
  // Seeding Queues
  const queues = Generate.times(5).bulkQueues();

  return (
    <>
      <QueueContextProvider seedQueues={queues}>
        <div style={{ display: "flex", width: "100%" }}>
          <Insert />
        </div>
        <div style={{ display: "flex" }}>
          {queues.map((queue, index) => (
            <Queue key={`Q-${index}`} {...queue} />
          ))}
        </div>
      </QueueContextProvider>
    </>
  );
}

export default App;
