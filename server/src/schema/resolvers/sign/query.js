import Sign from 'model/sign';
import Location from 'model/location';

const Query = {};

Query.signsByStreet = async (root, args) => {
  const {
    boro, main_st, from_st, to_st,
  } = args;
  const location = await Location.findOne({
    boro, main_st, from_st, to_st,
  }).exec();
  return await Sign.find({ boro, order_no: location.order_no }).sort({ sequence: 1 }).exec();
};

Query.signs = async (root, { input }) => {
  return await Sign.find(input).sort({ sequence: 1 });
};

export default Query;
