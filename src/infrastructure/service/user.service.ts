import { autoInjectable, container } from "tsyringe";
import { UserRepository } from "../db/repositories/user.repository";
import { UserDto } from "../../web-api/dtos/user.dto";
import { User } from "../db/entities/user.entity";
import { EncryptService } from "./encrypt.service";

@autoInjectable()
export class UserService {

    private readonly userRepository: UserRepository;
    private readonly encryptService: EncryptService;

    constructor(){
        this.userRepository = container.resolve(UserRepository);
        this.encryptService = container.resolve(EncryptService);
    }  
    
    async login(email: string, password: string){
        try{
            const user = await this.userRepository.getUserByEmail(email);
            const isPasswordValid = await this.encryptService.isPasswordValid(password, user?.password);
            const isLoginValid = user &&  isPasswordValid;
            
            if(!isLoginValid){
                throw new Error('Information not valid')
            }

            return isLoginValid;

        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

    async register(userDto: UserDto){
        try{
            const encryptPassword = await this.encryptService.encryptPassword(userDto.password);

            const userEntity = new User();
            userEntity.name = userDto.name;
            userEntity.email = userDto.email;
            userEntity.password = encryptPassword;

            this.userRepository.saveUser(userEntity);
            return userEntity;
        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

}