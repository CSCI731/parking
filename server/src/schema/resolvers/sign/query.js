import Sign from 'model/sign';

const Query = {};

Query.signs = async (root, args) => {
  const { boro, order_no: orderNo } = args;

  return Sign.find({ boro, order_no: orderNo });
};
