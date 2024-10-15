import 'dotenv/config';

export const config = {
    apiToken: process.env.API_TOKEN as string,
    port: process.env.PORT,
    endpointsCats: {
        getBreeds: process.env.ENDPOINT_GET_BREEDS as string,
        getBreedsById: process.env.ENDPOINT_GET_BREEDS_BY_ID as string,
        getBreedsSearch: process.env.ENDPOINT_GET_BREEDS_SEARCH as string,
        getImagesByBreedId: process.env.ENDPOINT_GET_IMAGES_BY_BREED_ID as string
    },
    axios: {
        timeOut: process.env.AXIOS_TIME_OUT as string
    }
  };