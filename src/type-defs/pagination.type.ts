import { GraphQLInt, GraphQLObjectType } from "graphql";

const PaginationType: GraphQLObjectType = new GraphQLObjectType({
	name: "Pagination",
	fields: () => ({
		total: { type: GraphQLInt },
		size: { type: GraphQLInt },
		page: { type: GraphQLInt },
	}),
});

export default PaginationType;
