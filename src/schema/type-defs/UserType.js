const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = require("graphql");

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        createdAt: {type: GraphQLString},
        updatedAT: {type: GraphQLString}
    })
});

module.exports = UserType;