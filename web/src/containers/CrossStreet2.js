import { compose, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import getToSt from '../gql/query/getToSt';
import CrossStreet2 from '../components/CrossStreet2';
import CrossStreet2Waiting from '../components/CrossStreet2Waiting';

export default compose(
  graphql(getToSt, {
    skip: ({ boro, onStreet, crossStreet1 }) => {
      return !(boro && onStreet && crossStreet1)
    },
    options: ({ boro, onStreet, crossStreet1 }) => ({
      variables: {
        input: {
          boro: [boro],
          main_st: onStreet,
          from_st: crossStreet1,
        }
      }
    })
  }),
  branch(
    ({ boro, onStreet, crossStreet1 }) => boro && onStreet && crossStreet1,
    renderComponent(CrossStreet2),
    renderComponent(CrossStreet2Waiting),
  )
)(CrossStreet2);