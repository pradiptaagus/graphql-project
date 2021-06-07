import { getConnection, Like, Repository } from "typeorm";
import { User } from "../../models/User";
import { CountUserDTO, UserQueryDTO } from "./user.dto";

export default class UserService {
	userRepository: Repository<User>;

	constructor() {
		this.userRepository = getConnection().getRepository<User>(User);
	}

	count(query: CountUserDTO) {
		const whereClause: Record<string, any> = {};
		if (query.filter) whereClause.name = Like(`%${query.filter}%`);

		try {
			return this.userRepository.count({
				where: whereClause,
			});
		} catch (error) {
			throw error;
		}
	}

	findAll(query: UserQueryDTO) {
		const whereClause: Record<string, any> = {};
		if (query.filter) whereClause.name = Like(`%${query.filter}%`);

		try {
			return this.userRepository.find({
				where: whereClause,
				skip: (query.page - 1) * query.size,
				take: query.size,
			});
		} catch (error) {
			throw error;
		}
	}

	findOne(id: string) {
		try {
            return this.userRepository.findOne(id);
        } catch (error) {
            throw error;
        }
	}

	store(body: { name: string }) {
		try {
            return this.userRepository.save(body);
        } catch (error) {
            throw error;
        }
	}

	update(body: { name: string }, id: string) {
		try {
            return this.userRepository.update(id, body);
        } catch (error) {
            throw error;
        }
	}

	delete(id: string) {
		try {
            return this.userRepository.delete(id);
        } catch (error) {
            throw error;
        }
	}
}
