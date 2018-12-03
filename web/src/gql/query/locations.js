import gql from 'graphql-tag';

export default gql`
    query locations($input: locationsInput!, $offset:Int, $limit: Int = 20){
        locations(input: $input, offset:$offset, limit: $limit){
            totalCount
            locations{
                _id
                boro
                main_st
                from_st
                to_st
                sos
            }
        }
    }
`;