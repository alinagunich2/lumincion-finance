import { CustomHttp } from "../services/custon-http.js";
import configs from "../../config/configs.js"

export class Balance{
    constructor(){
        this.data = null
        this.bal()
    }

    async bal(){
        try{
  
            const result = await CustomHttp.request(configs.host+'/balance')
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
  
                this.data = result
                document.getElementById('sum-balans').innerText = this.data.balance+'$'
                
            }
        }catch(e){
            console.log(e)
        }
    }
}