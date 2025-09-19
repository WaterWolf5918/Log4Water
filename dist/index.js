"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(entryPoint) {
        this.entryPoint = entryPoint;
        console.log(entryPoint);
    }
}
exports.Logger = Logger;
