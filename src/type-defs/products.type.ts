import { GraphQLList, GraphQLObjectType } from "graphql";
import PaginationType from "./pagination.type";
import ProductType from "./product.type";

const ProductsType: GraphQLObjectType = new GraphQLObjectType({
    name: "Products",
    fields: () => ({
        pagination: {type: PaginationType},
        data: {type: GraphQLList(ProductType)}
    })
});

export default ProductsType;