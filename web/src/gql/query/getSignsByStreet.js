import gql from 'graphql-tag';

export default gql`
    query SignsByStreet($boro: String!, $main_st: String!, $from_st: String!, $to_st: String!) {
        signsByStreet(boro:$boro, main_st:$main_st, from_st:$from_st, to_st:$to_st) {
            description
        }
    }
`;