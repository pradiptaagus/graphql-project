import { GraphQLObjectType, GraphQLString } from "graphql";

const UnitType: GraphQLObjectType = new GraphQLObjectType({
    name: "Unit",
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    })
});

export default UnitType;