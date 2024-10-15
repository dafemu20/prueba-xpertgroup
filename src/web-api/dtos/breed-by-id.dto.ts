import { Breed } from "@thatapicompany/thecatapi";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class BreedByIdDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(Breed)
    breedId: string;
}