import gql from 'graphql-tag';

export default gql`
    query locations($input: locationsInput!){
        locations(input: $input){
            locations {
                to_st
            }
        }
    }
`;