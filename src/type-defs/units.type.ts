import { GraphQLList, GraphQLObjectType } from "graphql";
import PaginationType from "./pagination.type";
import UnitType from "./unit.type";

const UnitsType: GraphQLObjectType = new GraphQLObjectType({
    name: "Units",
    fields: () => ({
        pagination: {type: PaginationType},
        data: {type: GraphQLList(UnitType)}
    })
});

export default UnitsType;