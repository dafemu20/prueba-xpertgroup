import { container, injectable } from "tsyringe";
import { config } from "../../config/environment";
import { HttpService } from "./http.service";

@injectable()
export class CatService {

    private readonly httpService : HttpService;

    constructor(){
        this.httpService = container.resolve(HttpService);
    }

    async getBreeds(){
        try{
            const breeds = await this.httpService.get(config.endpointsCats.getBreeds);
            return breeds.map((breed: { id: string; name: string; }) => ({
                id: breed.id,
                name: breed.name
            }));
        }catch(exception){
            console.error(exception);
            throw exception;
        }
        
    }

    async getBreedsById(id: string){
        try{
            const url = config.endpointsCats.getBreedsById.replace(':breedId', id);
            const breeds = await this.httpService.get(url);
            return breeds;
        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

    async getBreedsSearch(query: string){
        try{
            const url = `${config.endpointsCats.getBreedsSearch}?q=${query}`;
            const breeds = await this.httpService.get(url);
            return breeds;
        }catch(exception){
            console.error(exception);
            throw exception;
        }
    }

}