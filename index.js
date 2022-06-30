const { ApolloServer } = require('apollo-server');
const { sequelize } = require('./models/index')
const resolvers  = require('./graphql/resolvers')
const typeDefs = require('./graphql/typeDefs')
const cors = require('cors')
const express = require('express')


// const app = express()
// app.use(cors())
// app.use(express.json())


const server = new ApolloServer({
    typeDefs, // graphql schema
    resolvers, // a map of functions which return data from schema 
    // context: {
    //     test: "test"
    // }
    csrfPrevention: true,
    cache: 'bounded',
    // cors,
})


// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);

    sequelize.authenticate()
        .then(()=>{ console.log('successfully connected to database')})
        .catch((err)=> {console.log(err)})
});