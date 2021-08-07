import { getConnection, Like, Not, Repository } from "typeorm";
import InternalServerError from "../../errors/internal-server-error.error";
import { CountUnitDTO, StoreUnitDTO, UnitQueryDTO, UpdateUnitDTO } from "./unit.dto";
import { Unit } from "./unit.entity";

export default class UnitService {
    unitRepository: Repository<Unit>;

    constructor() {
        this.unitRepository = getConnection().getRepository<Unit>(Unit);
    }

    count(query: CountUnitDTO) {
        const whereClause: Record<string, any> = {};
        if (query.filter) whereClause.name = Like(`%${query.filter}%`);

        try {
            return this.unitRepository.count({
                where: whereClause
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findAll(query: UnitQueryDTO) {
        const whereCluse: Record<string, any> = {};
        if (query.filter) whereCluse.name = Like(`%${query.filter}%`);

        try {
            return this.unitRepository.find({
                where: whereCluse,
                skip: (query.page - 1) * query.size,
                take: query.size
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findOne(id: string) {
        try {
            return this.unitRepository.findOne(id);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findByName(name: string) {
        try {
            return this.unitRepository.findOne({
                where: {
                    name
                }
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findUnitAlreadyExist(id: string, name: string) {
        try {
            return this.unitRepository.findOne({
                where: {
                    id: Not(id),
                    name
                }
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    store(body: StoreUnitDTO) {
        try {
            return this.unitRepository.save(body);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    update(body: UpdateUnitDTO, id: string) {
        try {
            return this.unitRepository.update(id, body);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    delete(id: string) {
        try {
            return this.unitRepository.delete(id);
        } catch (error) {
            throw new InternalServerError();
        }
    }
}