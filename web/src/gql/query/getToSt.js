import gql from 'graphql-tag';

export default gql`
    query locations($input: locationsInput!){
        locations(input: $input){
            to_st
        }
    }
`;