export class Ernings{
    constructor(){
        this.page = null
    }
    async int(data = this.dateFromTo){
        try{

            const result = await CustomHttp.request(config.host+'/operations?period=interval&dateFrom='+data)
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.data = result
                this.processData()
                
                if(this.data){
                    this.deleteItm()
                }
            }
        }catch(e){
            console.log(e)
        }
    }
}