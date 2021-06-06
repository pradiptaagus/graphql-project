const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const {createUser, updateUser, deleteUser} = require("./mutations/UserMutation");
const {getUsers, getUser} = require('./queries/UserQuery');

const rootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
        getUsers,
        getUser
    }
});

const mutation= new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser,
        updateUser,
        deleteUser
    }
});

const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: mutation
})

module.exports = schema;