import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import LocationPage from '../pages/Location';
import locationQuery from '../gql/query/location';
import renderWhileLoading from '../components/renderWhileLoading';
import Loading from '../components/Loading';
import renderForError from "../components/renderForError";
import Error from '../components/Error';

export default compose(
  graphql(locationQuery, {
    options: (props) => {
      const { match: { params: { locationId } } } = props;

      return {
        variables: {
          _id: locationId,
        }
      };
    }
  }),
  renderWhileLoading(Loading, 'location'),
  renderForError(Error)
)(LocationPage);