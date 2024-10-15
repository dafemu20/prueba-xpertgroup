import { autoInjectable } from "tsyringe";
import { AppDataSource } from "../../../../ormconfig";
import { User } from "../entities/user.entity";

@autoInjectable()
export class UserRepository {

    private readonly userRepository;

    constructor(){
       this.userRepository = AppDataSource.getMongoRepository(User);
    }

    async saveUser(user: User) {
        try{
            await this.userRepository.save(user);
        }catch(exception){
            console.log(exception);
        }
    }

    async getUsers() {
        return await this.userRepository.find();
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.find({
            where: {
                email: email
            }
        });
        return user[0];
    }
}