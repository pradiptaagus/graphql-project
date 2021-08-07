import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLResolveInfo, GraphQLString } from "graphql";
import validator from "validator";
import InputError from "../../errors/input.error";
import Authorization from "../../helpers/authorization.helper";
import ProductType from "../../type-defs/product.type";
import ProductsType from "../../type-defs/products.type";
import UnitService from "../unit/unit.service";
import ProductService from "./product.service";

export const getProducts = {
    type: ProductsType,
    args: {
        filter: {type: GraphQLString},
        page: {type: GraphQLInt},
        size: {type: GraphQLInt}
    },
    resolve: async(_: any, {filter, page = 1, size = 10}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);

            const products = await new ProductService().findAll({
                filter, 
                page, 
                size
            });
            const count = await new ProductService().count({filter});
            return {
                pagination: {
                    total: count,
                    size, 
                    page
                },
                data: products
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const getProduct = {
    type: ProductsType,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async(_: any, {id}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);
            const product = await new ProductService().findOne(id);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const storeProduct  = {
    type: ProductType,
    args: {
        code: {type: GraphQLString},
        name: {type: GraphQLString},
        unitId: {type: GraphQLID}
    },
    resolve: async (_: any, {code, name, unitId}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);

            const isCodeExist = await new ProductService().findByCode(code);
            if (isCodeExist) {
                throw new InputError({
                    code: "The code is already been taken."
                });
            }

            if (validator.isEmpty(name)) {
                throw new InputError({
                    name: "The name field must not be empty."
                });
            }
            
            if (validator.isEmpty(unitId)) {
                throw new InputError({
                    unitId: "The unitId field must not be empty."
                });
            }

            const unit = await new UnitService().findOne(unitId);
            if (!unit) {
                throw new InputError({
                    unitId: "The unit with provided id is not found."
                });
            }

            const result = await new ProductService().store({
                code: code || "",
                name: name,
                stock: 0,
                unit: unit
            });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const updateProduct = {
    type: ProductType,
    args: {
        id: {type: GraphQLID},
        code: {type: GraphQLString},
        name: {type: GraphQLString},
        unitId: {type: GraphQLID}
    },
    resolve: async (_: any, {id, code, name, unitId}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);

            const isCodeExist = await new ProductService().findProductAlreadyExist(id, code);
            if (isCodeExist) {
                throw new InputError({
                    code: "The code is already been taken."
                });
            }

            if (validator.isEmpty(name)) {
                throw new InputError({
                    name: "The name field must not be empty."
                });
            }
            
            if (validator.isEmpty(unitId)) {
                throw new InputError({
                    unitId: "The unitId field must not be empty."
                });
            }

            const unit = await new UnitService().findOne(unitId);
            if (!unit) {
                throw new InputError({
                    unitId: "The unit with provided id is not found."
                });
            }

            const result = await new ProductService().store({
                code: code || "",
                name: name,
                stock: 0,
                unit: unit
            });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const deleteProduct = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async(_: any, {id}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);

            if (validator.isEmpty(id)) {
                throw new InputError({
                    id: "The id is required."
                });
            }

            const result = await new ProductService().delete(id);

            if (!result.affected) {
                throw new Error("The product with specified ID is doens't exist.");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}