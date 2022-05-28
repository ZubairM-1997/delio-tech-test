export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}

export class APIError  {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    public readonly description: string;

    constructor(name: string, httpCode: HttpStatusCode) {
      
        this.name = name;
        this.httpCode = httpCode;
        this.description = 'API Request cannot be fulfilled'
      }
}

export class DBError {
    public readonly name: string;
    public readonly description: string;

    constructor(name: string, description: string){
        this.name = name;
        this.description = description;
    }

}