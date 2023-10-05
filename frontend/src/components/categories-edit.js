import { CustomHttp } from "../services/custon-http.js";
import config from "../../config/config.js"
import { UrlManager } from "../utills/utills.js";


export class CategoriesEdit{
    constructor(page){
        this.page = page
        this.routeParams = UrlManager.getQueryParams()

        this.title =document.getElementById('content-title')
        this.create = document.getElementById('create')
        this.input = document.getElementsByTagName('input')[0]
        this.input.value = this.routeParams.type

        if(this.page ==='ernings'){
            this.erningEdit()
           
        }else {
           this.comEdit()
        }
        

        let that = this 
            this.input.onchange=function(){
                that.validateForm(); 
            }
    }
   
    cancel(type){
        document.getElementById('cancel').onclick = function () {
            document.getElementById('form')
            location.href = '#/'+ type
        }
    }
    validateForm(){
        if(this.input.value){
            this.create.removeAttribute('disabled')
        }
    }
    erningEdit(){
        let that = this
        this.title.innerText = 'Редактирование категории доходов'
        this.cancel('ernings','#/ernings')
        this.create.onclick= function(){
            that.editData('income','#/ernings')
           
        }

    }
    comEdit(){
        let that = this
        this.title.innerText = 'Редактирование категории расходов'
        this.cancel('comsuption')
        this.create.onclick= function(){
            that.editData('expense','#/comsuption')
        }
    }

    async editData(type,page){
        try{
            const result = await CustomHttp.request(config.host+'/categories/'+type+'/'+this.routeParams.id,'PUT',{
                title: this.input.value,
             })

             if(result){
                 location.href=page
             }

         }catch(e){
              console.log(e)
    }
}

}