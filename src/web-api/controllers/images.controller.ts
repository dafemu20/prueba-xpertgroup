import { Controller, Get, Params, Status } from "@decorators/express";
import { autoInjectable, container } from "tsyringe";
import { BreedByIdDto } from "../dtos/breed-by-id.dto";
import { validations } from "../middleware/route-validation.middleware";
import { ImagesService } from "../../infrastructure/service/images.service";

@autoInjectable()
@Controller("/cat/images")
export class ImagesController {

    private readonly imagesService : ImagesService;

    constructor(){
        this.imagesService = container.resolve(ImagesService);
    }

    @Status(200)
    @Get("/breed/:breedId", [
        validations(BreedByIdDto)
    ])
    async getImageByBreedId(@Params() params: BreedByIdDto) {
        const breed = await this.imagesService.getImageByBreedId(params.breedId);
        return { breed };
    }
}