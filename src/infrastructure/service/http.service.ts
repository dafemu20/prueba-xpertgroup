import axios, { AxiosInstance } from "axios";
import { config } from "../../config/environment";
import https from 'https';
import { injectable } from "tsyringe";

@injectable()
export class HttpService {
    private instanceAxios: AxiosInstance;
  
    constructor() {
      this.instanceAxios = axios.create({
        timeout: parseInt(config.axios.timeOut),
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      });
    }

    async get(url: string): Promise<any> {
        const response = await this.instanceAxios.get(url);
        if (response && response.data) {
          return response.data;
        }
        return null;
    }
}