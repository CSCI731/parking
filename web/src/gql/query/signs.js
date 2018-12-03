import gql from 'graphql-tag';

export default gql`
    query signs($input: signsInput!) {
        signs(input: $input) {
            _id
            boro
            order_no
            sequence
            distance
            arrow_pt
            description
            code
        }
    }
`;