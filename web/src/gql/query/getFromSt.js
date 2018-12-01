import gql from 'graphql-tag';

export default gql`
    query locations($input: locationsInput!){
        locations(input: $input){
            from_st
        }
    }
`;