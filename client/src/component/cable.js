import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("wss://rapool.herokuapp.com/cable");

export default cable;