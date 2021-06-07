import { GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";

const PaginationType = (itemType: GraphQLObjectType) => {
	return new GraphQLObjectType({
		name: "Pagination",
		fields: () => ({
			pagination: { type: PageInfoType },
			data: { type: GraphQLList(itemType) },
		}),
	});
};

const PageInfoType: GraphQLObjectType = new GraphQLObjectType({
	name: "PageInfo",
	fields: () => ({
		total: { type: GraphQLInt },
		size: { type: GraphQLInt },
		page: { type: GraphQLInt },
	}),
});

export default PaginationType;
