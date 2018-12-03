import SignModel from 'model/sign';

const Mutation = {};

Mutation.addSign = async (parent, { input }, { user }) => {
  return await SignModel.insertOne(input);
};

export default Mutation;
