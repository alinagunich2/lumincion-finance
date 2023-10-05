import { CustomHttp } from "../services/custon-http.js";
import config from "../../config/config.js"
import { Popap } from "../utills/popap.js";


export class Categories{
    constructor(page){
        this.page = page

        this.title =document.getElementById('content-title')

        this.categories = null
        this.idDelite = null

        if(this.page ==='ernings'){
            this.title.innerText = 'Доходы'
            this.int('income')
           
        }else {
            this.title.innerText = 'Расходы'
            this.int('expense')

        }

    }
    async int(type){
        try{

            const result = await CustomHttp.request(config.host+'/categories/'+type)
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.categories=result
                this.showCategories()
                this.deleteItm()
                this.createCategory()

            }
        }catch(e){
            console.log(e)
        }
    }

    showCategories(){
        const result = document.getElementById('cards')
        let content = '' 

        this.categories.forEach((itm)=>{
            content +=`
            <div class="cardd col-5 rounded-4" id='value="${itm.id}'>
                <div class="cards-title">${itm.title}</div>
                    <div class="d-flex">
                    <a href='#/${this.page ==='ernings'?'edit-categ-ernings':'edit-categ-com'}?id=${itm.id}&type=${itm.title}' type='button' class="button-edit btn btn-primary me-2" id='edit'>Редактировать</a>
                    <button type='button' class="button-delete btn btn-danger delete" value="${itm.id}">Удалить</button>
                </div>
            </div>
            `
         })

         content +=`
            <a href='#/${this.page ==='ernings'?'create-categ-ernings':'create-categ-com'}' class="cardd col-5 rounded-4" id='create'>
                <div>
                <img src="img/ernings-comsumption/+.svg" alt="+" >
                </div>
            </a>
            `
        result.innerHTML = content
    }

    async delete(type,itm){
        try{

            const result = await CustomHttp.request(config.host+'/categories/'+type+'/'+itm, 'DELETE')
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
            this.int(type)
            }
        }catch(e){
            console.log(e)
        }
    }
    deleteItm(){
        let that = this
     
        var deleteElms =  document.getElementsByClassName('delete');
        for(var i=0;i<deleteElms.length;i++){
            deleteElms[i].addEventListener('click', function(e){
                if(e.target){
                    that.idDelite = e.target.getAttribute('value')
                    console.log(that.idDelite)
                    that.popapShow()
                }
            })
        } 
    }
    popapShow(){
        Popap.popapText('Вы действительно хотите удалить категорию? Связанные доходы будут удалены навсегда.', 'Да, удалить', 'Не удалять')
        Popap.popapHidden()

        let that = this

        document.getElementById('popap-btn-f').onclick = function () {
            document.getElementById('popap').style.display='none'

            if(that.page ==='ernings'){
                that.delete('income',that.idDelite)               
            }else{
                that.delete('expense',that.idDelite)    
            }
            
        }
    }



    createCategory(){

    }
}