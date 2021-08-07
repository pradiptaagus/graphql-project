import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import UnitType from "./unit.type";

const ProductType: GraphQLObjectType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: {type: GraphQLID},
        code: {type: GraphQLString},
        name: {type: GraphQLString},
        stock: {type: GraphQLInt},
        unit: {type: UnitType}
    })
});

export default ProductType;