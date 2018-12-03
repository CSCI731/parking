import gql from 'graphql-tag';

export default gql`
    mutation removeLocation($input: removeLocationInput!) {
        removeLocation(input: $input)
    }
`;