export class Logger {
    entryPoint: string;
    constructor(entryPoint: string){
        this.entryPoint = entryPoint;
        console.log(entryPoint);
    }
}