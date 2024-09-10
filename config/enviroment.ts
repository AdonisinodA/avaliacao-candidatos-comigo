import "dotenv/config"
class Enviroment{
    PORT : string | undefined
    constructor(){
        this.PORT = process.env.PORT
    }
}


export default new Enviroment()