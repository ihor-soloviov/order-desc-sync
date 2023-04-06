export const allAddressesLine = (response) => {
  response.data.orders.forEach((order) => {
    const { shipping, id } = order;
    const {
       address1,
       address2,
       address3,
       address4,
       country,
       state,
       city, 
      } = shipping;
    const address = address1 || address2 || address3 || address4;
    const addressParams = [];
    addressParams.push(country, state, city, address);
    const fullShippingAddress = addressParams.filter(Boolean).join(', ');
    ;
    console.log(
      `New order: ID ${id}, shipping address: ${fullShippingAddress || 'unknown address'}`
    );
  });
};
