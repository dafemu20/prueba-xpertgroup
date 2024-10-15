import { autoInjectable } from "tsyringe";
import bcrypt from 'bcrypt';

@autoInjectable()
export class EncryptService {

    private readonly saltRounds = 10;
    
    async encryptPassword (password: string) {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async isPasswordValid(passwordToCompare: string, userPassword: string) {
        return await bcrypt.compare(passwordToCompare, userPassword);
    }
}