import { compose } from 'recompose';
import LocationsPage from '../pages/Locations';
import { graphql } from 'react-apollo';
import locationsQuery from '../gql/query/locations';
import removeLocationMutation from '../gql/mutation/removeLocation';
import renderForError from "../components/renderForError";
import Error from '../components/Error';

export default compose(
  graphql(locationsQuery, {
    options: {
      variables: {
        input: {},
        limit: 10,
      }
    }
  }),
  graphql(removeLocationMutation),
  renderForError(Error),
)(LocationsPage);