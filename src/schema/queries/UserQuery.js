const { GraphQLList, GraphQLID} = require("graphql");
const User = require("../../model/User");
const UserType = require("../type-defs/UserType");

const getUsers = {
    type: new GraphQLList(UserType),
    resolve: () => {
        return User.findAll();
    }
}

const getUser = {
    type: UserType,
    args: {
        id: {type: GraphQLID}
    },
    resolve: (_, {id}) => {
        return User.findOne({
            where: {
                id
            }
        });
    }
}

module.exports = {
    getUsers,
    getUser
};