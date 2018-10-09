import Location from 'model/location';

const Query = {};

Query.location = async (root, args) => {
  const { order_no: orderNo } = args;
  return Location.findOne({ order_no: orderNo }).exec();
};

Query.locations = async (root, args) => {
  const { boro, main_st: mainSt } = args;
  let selector = { boro };
  if (mainSt) {
    selector = Object.assign({}, selector, { main_st: mainSt });
  }
  return Location.find(selector, null, { limit: 50 }).exec();
};


export default Query;
