export class ErrorCustom extends Error {
    constructor(public message: string, public code: number){
        super(message)
    }
}