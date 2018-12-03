import gql from 'graphql-tag';

export default gql`
    query location($_id: ID!){
        location(_id: $_id){
            _id
            boro
            order_no
            main_st
            from_st
            to_st
            sos
        }
    }
`;