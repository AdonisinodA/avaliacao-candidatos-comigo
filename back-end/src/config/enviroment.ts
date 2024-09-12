import "dotenv/config"
class Enviroment{
    PORT : string 
    SECRET_KEY_JWT : string 
    constructor(){
        this.PORT = process.env.PORT ?? ''
        this.SECRET_KEY_JWT = process.env.SECRET_KEY_JTW ?? ''
    }
}


export default new Enviroment()