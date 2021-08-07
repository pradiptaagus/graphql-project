import { getConnection, Like, Not, Repository } from "typeorm";
import InternalServerError from "../../errors/internal-server-error.error";
import { CountProductDTO, ProductQueryDTO, StoreProductDTO, UpdateProductDTO } from "./product.dto";
import { Product } from "./product.entity";

export default class ProductService {
    productRepository: Repository<Product>;

    constructor() {
        this.productRepository = getConnection().getRepository<Product>(Product);
    }

    count(query: CountProductDTO) {
        const whereClause: Record<string, any> = {};
        if (query.filter) whereClause.name = Like(`%${query.filter}%`);

        try {
            return this.productRepository.count({
                where: whereClause
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findAll(query: ProductQueryDTO) {
        const whereClause: Record<string, any> = {};
        if (query.filter) whereClause.name = Like(`%${query.filter}%`);

        try {
            return this.productRepository.find({
                where: whereClause,
                skip: (query.page - 1) * query.size,
                take: query.size
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findOne(id: string) {
        try {
            return this.productRepository.findOne(id);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findByName(name: string) {
        try {
            return this.productRepository.findOne({
                where: {
                    name
                }
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    findByCode(code: string) {
        try {
            return this.productRepository.findOne({
                where: {
                    code
                }
            });
        } catch (error) {
            return new InternalServerError();
        }
    }

    findProductAlreadyExist(id: string, code: string) {
        try {
            return this.productRepository.findOne({
                where: {
                    id: Not(id),
                    code
                }
            });
        } catch (error) {
            throw new InternalServerError();
        }
    }

    store(body: StoreProductDTO) {
        try {
            return this.productRepository.save(body);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    update(body: UpdateProductDTO, id: string) {
        try {
            return this.productRepository.update(id, body);
        } catch (error) {
            throw new InternalServerError();
        }
    }

    delete(id: string) {
        try {
            return this.productRepository.delete(id);
        } catch (error) {
            throw new InternalServerError();
        }
    }
}