import { getConnection, Like, Not, Repository } from "typeorm";
import { User } from "./user.entity";
import {
	CountUserDTO,
	StoreUserDTO,
	UpdateUserDTO,
	UserQueryDTO,
	UpdatePassword,
} from "./user.dto";
import InternalServerError from "../../errors/internal-server-error.error";

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
			throw new InternalServerError();
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
			throw new InternalServerError();
		}
	}

	findOne(id: string) {
		try {
			return this.userRepository.findOne(id);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	findByUsername(username: string) {
		try {
			return this.userRepository.findOne({
				where: {
					username,
				},
				select: ["id", "username", "password"],
			});
		} catch (error) {
			throw new InternalServerError();
		}
	}

	findUserAlreadyExist(id: string, username: string) {
		try {
			return this.userRepository.findOne({
				where: {
					id: Not(id),
					username,
				},
			});
		} catch (error) {
			throw new InternalServerError();
		}
	}

	store(body: StoreUserDTO) {
		try {
			return this.userRepository.save(body);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	update(body: UpdateUserDTO, id: string) {
		try {
			return this.userRepository.update(id, body);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	updatePassword(body: UpdatePassword, id: string) {
		try {
			return this.userRepository.update(id, body);
		} catch (error) {
			throw new InternalServerError();
		}
	}

	delete(id: string) {
		try {
			return this.userRepository.delete(id);
		} catch (error) {
			throw new InternalServerError();
		}
	}
}
