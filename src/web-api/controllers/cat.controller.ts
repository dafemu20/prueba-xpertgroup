import { Controller, Get, Params, Query, Status } from "@decorators/express";
import { autoInjectable, container } from "tsyringe";
import { CatService } from "../../infrastructure/service/cat.service";
import { BreedByIdDto } from "../dtos/breed-by-id.dto";
import { validations } from "../middleware/route-validation.middleware";

@autoInjectable()
@Controller("/cat")
export class CatController {

    private readonly catService : CatService;

    constructor(){
        this.catService = container.resolve(CatService);
    }

    @Status(200)
    @Get("/breeds")
    async getBreeds() {
        const breeds = await this.catService.getBreeds();
        return { breeds: breeds };
    }

    @Status(200)
    @Get("/breeds/search")
    async getBreedsearch(@Query("query") query: string) {
        const breed = await this.catService.getBreedsSearch(query);
        return { breed };
    }

    @Status(200)
    @Get("/breeds/:breedId", [
        validations(BreedByIdDto)
    ])
    async getBreedsById(@Params() params: BreedByIdDto) {
        const breed = await this.catService.getBreedsById(params.breedId);
        return { breed };
    }
}