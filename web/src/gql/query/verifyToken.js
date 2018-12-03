import gql from 'graphql-tag';

export default gql`
    query verifyToken($token: String!) {
        verifyToken(token: $token){
            _id
        }
    }
`;