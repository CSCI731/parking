import { compose, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import getFromSt from '../gql/query/getFromSt';
import CrossStreet1 from '../components/CrossStreet1';
import CrossStreet1Waiting from '../components/CrossStreet1Waiting';

export default compose(
  graphql(getFromSt, {
    skip: ({ boro, onStreet }) => {
      return !(boro && onStreet)
    },
    options: ({ boro, onStreet }) => ({
      variables: {
        input: {
          boro: [boro],
          main_st: onStreet,
        }
      }
    })
  }),
  branch(
    ({ boro, onStreet }) => boro && onStreet,
    renderComponent(CrossStreet1),
    renderComponent(CrossStreet1Waiting),
  )
)(CrossStreet1);