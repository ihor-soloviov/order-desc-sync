import axios from "axios";
import { scheduleJob } from "node-schedule";
import { allAddressesLine } from "./utils/allAddressesLine.js";

const apiKey = "UtFSGa4gkqoCgkyXowthHhCLq9mioQNQLBu7nvgzAskcG7Eoot";
const storeId = 52114;

const headers = {
  "ORDERDESK-STORE-ID": storeId,
  "ORDERDESK-API-KEY": apiKey,
  "Content-Type": "application/json",
};


const synchronizeNewOrders = async () => {
  try {
    const response = await axios.get("https://app.orderdesk.me/api/v2/orders/new", { headers })
    allAddressesLine(response)
    
  } catch(error) {
    console.error(`Error fetching new orders from OrderDesk API: ${error.message}`);
  }
};

scheduleJob('43 13 * * *', synchronizeNewOrders);
