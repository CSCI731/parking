import Sign from 'model/sign';
import Location from 'model/location';

const Query = {};

Query.signsByStreet = async (root, args) => {

  const { boro, main_st, from_st, to_st } = args;
  const location = await Location.findOne({ boro, main_st, from_st, to_st }).exec();

  const signs = await Sign.find({ boro, order_no: location.order_no }).exec();

  return signs;
};
