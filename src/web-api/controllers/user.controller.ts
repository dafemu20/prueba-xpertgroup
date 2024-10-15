import { Body, Controller, Get, Params, Post, Status } from "@decorators/express";
import { autoInjectable, container } from "tsyringe";
import { UserService } from "../../infrastructure/service/user.service";
import { UserDto } from "../dtos/user.dto";

@autoInjectable()
@Controller("/user")
export class UserController {

    private readonly userService : UserService;

    constructor(){
        this.userService = container.resolve(UserService);
    }

    @Status(201)
    @Post("/register")
    async register(@Body() user: UserDto) {
        return await this.userService.register(user);
    }

    @Status(200)
    @Get("/login/:email/:password")
    async login(@Params("email") email: string, @Params("password") password: string) {
        const isLoginValid = await this.userService.login(email, password);
        return isLoginValid;
    }
}