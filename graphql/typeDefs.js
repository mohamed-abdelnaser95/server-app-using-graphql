const { gql } = require('apollo-server')

const typeDefs = gql`
    
    type User {
        id: Int!
        strName: String!
        dtmDOB: String!
        strEmail: String!
        strPassword: String!
        blnIsActive: Boolean!
    }

    type Query {
        getUsers: [User]!
        getUserById(id: Int): User!
        getUsersByEmail(strEmail: String): [User]!
        loginUser(strEmail: String, strPassword: String): User!
    }

    type Mutation {
        addUser(
            strName: String!
            dtmDOB: String!
            strEmail: String!
            strPassword: String!
            blnIsActive: Boolean!
        ): User!

        deleteUser(id: Int): String!

        updateUser(
            id: Int!
            strName: String!
            strPassword: String!
            dtmDOB: String!
            strEmail: String!
        ): User!
    
        updateUserStatus(
            strEmail: String!
            blnIsActive: Boolean!
        ): User!
    }
`

module.exports = typeDefs