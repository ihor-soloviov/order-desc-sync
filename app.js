import axios from "axios";
import { scheduleJob } from "node-schedule";

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
    response.data.orders.forEach(order => {
      const {shipping, id} = order;
      const address = shipping.address1 || shipping.address2 || shipping.address3 || shipping.address4;
      const shippingAddres = `${shipping.country}, ${shipping.state}, ${shipping.city}, ${address}`
            console.log(`New order: ID ${id}, shipping address: ${shippingAddres}`);
    })
    
  } catch(error) {
    console.error(`Error fetching new orders from OrderDesk API: ${error.message}`);
  }
};

// Schedule script to run hourly
scheduleJob('47 12 * * *', synchronizeNewOrders);
