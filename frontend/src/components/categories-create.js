import { CustomHttp } from "../services/custon-http.js";
import config from "../../config/config.js"

export class CategoriesCreate{
    constructor(page){
        this.page = page

        this.title =document.getElementById('content-title')
        this.create = document.getElementById('create')
        this.input = document.getElementsByTagName('input')

        if(this.page ==='ernings'){
            this.erningCreate()
           
        }else {
           this.comCreate()
        }
        
        let that = this 
            this.input[0].onchange=function(){
                that.validateForm(); 
            }
        
    }

    validateForm(){
        if(this.input[0].value){
            this.create.removeAttribute('disabled')
        }
    }

    cancel(type){
        document.getElementById('cancel').onclick = function () {
            document.getElementById('form')
            location.href = '#/'+ type
        }
    }

    erningCreate(){
        let that = this
        this.title.innerText = 'Создание категории доходов'
        this.cancel('ernings')
        this.create.onclick= function(){
            that.createCategory('income','#/ernings')
            
        }

    }

    comCreate(){
        let that = this
        this.title.innerText = 'Создание категории расходов'
        this.cancel('comsuption')
        this.create.onclick= function(){
            that.createCategory('expense','#/comsuption')
            
        }
    }

    async createCategory(type, page){
        try{

            const result = await CustomHttp.request(config.host+'/categories/'+type, 'POST',{
                title: this.input[0].value,
            })
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
                    
            location.href=page

              
            }
        }catch(e){
            console.log(e)
        }
    }
}