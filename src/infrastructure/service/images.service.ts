import { autoInjectable, container } from "tsyringe";
import { config } from "../../config/environment";
import { HttpService } from "./http.service";

@autoInjectable()
export class ImagesService {

    private readonly httpService: HttpService;

    constructor(){
        this.httpService = container.resolve(HttpService);
    }  
    
    async getImageByBreedId(breedId: string){
        try{
            const url = config.endpointsCats.getImagesByBreedId.replace('{breedId}', breedId);
            const images = await this.httpService.get(url);
            return images;
        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

}