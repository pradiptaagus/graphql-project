import { GraphQLBoolean, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import validator from "validator";
import InputError from "../../errors/input.error";
import Authorization from "../../helpers/authorization.helper";
import UnitType from "../../type-defs/unit.type";
import UnitsType from "../../type-defs/units.type";
import UnitService from "./unit.service";

export const getUnits = {
    type: UnitsType,
    args: {
        filter: {type: GraphQLString},
        page: {type: GraphQLInt},
        size: {type: GraphQLInt}
    },
    resolve: async(_: any, {filter, page = 1, size = 10}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);

            const units = await new UnitService().findAll({filter, page, size});
            const count = await new UnitService().count({filter});
            return {
                pagination: {
                    total: count,
                    size,
                    page
                },
                data: units
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const getUnit = {
    type: UnitType,
    args: {
        id: {type: GraphQLID}
    },
    resolve: async(_: any, {id}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
            new Authorization().check(authorizationHeader);
            const unit = await new UnitService().findOne(id);
            return unit;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const storeUnit = {
    type: UnitType,
    args: {
        name: {type: GraphQLString}
    },
    resolve: async(_: any, {name}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

            if (validator.isEmpty(name)) {
                throw new InputError({
                    name: "The name field must not be empty"
                });
            }

            const unit = await new UnitService().findByName(name);
            if (unit) {
                throw new InputError({
                    name: "The name is already been taken."
                });
            }

            const result = await new UnitService().store({name});
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const updateUnit = {
    type: UnitType,
    args: {
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    },
    resolve: async(_: any, {id, name}: any, context: any) => {
        try {
            const authorizationHeader = context.headers.authorization;
			new Authorization().check(authorizationHeader);

            if (validator.isEmpty(name)) {
                throw new InputError({
                    name: "The name field must not be empty"
                });
            }

            const isExist = await new UnitService().findUnitAlreadyExist(id, name);
            if (isExist) {
                throw new InputError({
                    name: "The name is already been taken."
                });
            }

            await new UnitService().update({name}, id);
            
            const unit = await new UnitService().findOne(id);
            
            return unit;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const deleteUnit = {
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

            const result = await new UnitService().delete(id);

            if (!result.affected) {
                throw new Error("The unit with specified ID is doens't exist.");
            }

            return true;
        } catch (error) {
            throw new Error(error);
        }
    }
}