# Market Queue Challenge

## Problem Statement

We're modeling a system to direct customers to the best queue available on a shop checkout with multiple queues.

- Given a number of checkout **Queues**, containing any number of **Customers**, with any number of **Items** to be billed
- And given an input where the user informs the number of **Items** for the next **Customer**
- Determine the best **Queue** to allocate that customer and insert it on the UI

## Architecture

First, let's outline our main entities

### App / Shop

This is our Shop main controller. Here we manage the seeding of our entities (Queues and Customers), which will in turn manage their own state (number of customers and items) and report back via Context.

We also handle the insertion of new Customers, allocating them to the best Queue available.

### Queue

The **Queues** have a progress mechanism of their own: anywhere between 1-3s an **Item** is gonna be passed. When all **Customer's** items are done, 2-5s are needed for payment, making way to the next **Customer**.

### Customer

The UI should reflect the number of items each customer has, as well as their movement through the queues.

\*\*

-
- Entities:
- - Queues
- - Customers
-
- Controls:
- - Add Customer form
-
- Behavior:
- - Initial Customers are passed in as props to each queue, who creates the appropriate components.
- - We'll keep track of those on Queue's state, rerendering appropriately.
- - Also Reporting back to QueueContext anytime the total number of items change.
- - The total number of Customers on a Queue could be an extra feature, to resolve Queue size draws
-
- Implementation:
- - [x] Create base entities / components
- - [x] Generate seed values and test UI display
- - [x] Model behaviors and entity changes
- - [ ] Add user controls
