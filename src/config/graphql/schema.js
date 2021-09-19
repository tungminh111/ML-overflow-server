const { gql } = require("apollo-server-express");

const schema = gql`
    type Query {
        "A simple type for getting started!"
        user: String
    }
`;

module.exports = schema;
