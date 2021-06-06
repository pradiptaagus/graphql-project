const { GraphQLString, GraphQLID, GraphQLBoolean } = require("graphql");
const User = require("../../model/User");
const UserType = require("../type-defs/UserType");

const createUser = {
    type: UserType,
    args: {
        name: {type: GraphQLString}
    },
    resolve: async(_, {name}) => {
        const result = await User.create({name});
        return result;
    }
}

const updateUser = {
    type: UserType,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    },
    resolve: async(_, {id, name}) => {
        if (!name) {
            throw new Error("Name is required.");
        }

        const result = await User.update({
            name
        }, {
            where: {
                id
            }
        });
        
        if (!result.length) {
            throw new Error('Internal server error');    
        }

        return await User.findOne({
            where: {
                id
            }
        });
    }
}

const deleteUser = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async(_, {id}) => {
        const result = await User.destroy({
            where: {
                id
            }
        });
        if (!result) {
            throw new Error("Internal server error");
        }
        return true;
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
};