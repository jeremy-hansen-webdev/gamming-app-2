// services/GameApiClient.ts

import axios, { type AxiosResponse } from "axios"

export interface Filters {
    platform: number
    genres: number
}

export class Games {

    private baseUrl = 'https://api.rawg.io/api/'
    private apiKey = '?key=d3fdcaeff69042ff8c2bd45d5d21c664'
    private urlString = ""


    constructor(private endpoint: string, private filters?: Filters){
        this.setApi()
    }

  private setApi(): void {
    let filterString = "";

    if (this.filters) {
      Object.entries(this.filters).forEach(([key, value]) => {
        filterString += `&${key}=${value}`;
      });
    }

    this.urlString = `${this.baseUrl}${this.endpoint}${this.apiKey}${filterString}`;
  }

    get AllData() {
        return axios.get(this.urlString)
        .then(function(res: AxiosResponse){
            return res.data
        })
        .catch(function(err: Error){
            throw err
        })
        .finally(function(){
            console.log('request finished')
        })
    }
}

