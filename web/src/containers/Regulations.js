import { compose, branch, renderComponent } from 'recompose';
import { graphql } from 'react-apollo';
import getSignsByStreet from '../gql/query/getSignsByStreet';
import Regulations from '../components/Regualtions';

export default compose(
  graphql(getSignsByStreet, {
    skip: ({ boro, onStreet, crossStreet1, crossStreet2 }) => {
      return !(boro && onStreet && crossStreet1 && crossStreet2)
    },
    options: ({ boro, onStreet, crossStreet1, crossStreet2 }) => ({
      variables: {
        boro,
        main_st: onStreet,
        from_st: crossStreet1,
        to_st: crossStreet2,
      }
    })
  }),
  branch(
    ({ boro, onStreet, crossStreet1, crossStreet2 }) => !(boro && onStreet && crossStreet1 && crossStreet2),
    renderComponent(() => null),
  )
)(Regulations);