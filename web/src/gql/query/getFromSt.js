import gql from 'graphql-tag';

export default gql`
    query locations($boro: Borough!, $main_st: String!) {
        locations(boro:$boro, main_st:$main_st) {
            from_st
        }
    }
`;