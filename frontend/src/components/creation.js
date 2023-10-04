import { CustomHttp } from "../services/custon-http.js";
import { UrlManager } from "../utills/utills.js";
import config from "../../config/config.js"

export class Creation {
    
    constructor(page){
        this.page=page;
        this.idItm = null

        this.routeParams = UrlManager.getQueryParams()

        this.categories =null
        this.categor = null

        this.input = document.getElementsByTagName('input')
        this.itmType = document.getElementsByClassName('dropdown-item')
        this.id = document.location.href.split('=')[1]
        this.test()
        
        if(this.page === 'create-ern'){
            this.createErn()
        }else if (this.page === 'create-com'){
            this.createCom()
        }else if(this.page === 'edit-ernings'){
            this.editErn()
            this.showEdit()
        }else{
            this.editCom()
            this.showEdit()
        }
        this.cancel()

        let that = this
        for(let i = 0;i<this.input.length;i++){
            this.input[i].onchange=function(){
                that.validateForm(); 
            }
        }
      
    }
   

    createErn(){
        this.showTitle('Создание дохода', 'доход')
        this.itmTyp('income')
        let that = this
        create.onclick = function () {
            
            that.savingData(that.itmType[1].id,'income','/operations','POST')
        }
    }
    createCom(){
        this.showTitle('Создание расхода','расход')
        this.itmTyp('expense')
        let that = this
        create.onclick = function () {
            that.idItm=that.itmType[1].id
            that.savingData(that.itmType[1].id,'expense','/operations','POST')
        }
    }
    async itmTyp(data){
        try{

            const result = await CustomHttp.request(config.host+'/categories/'+data)
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.categories = result
                
                if(this.categories){
                    this.searchType()
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    showTitle(text, type ){
        let input = this.input[0]
        document.getElementById('content-title').innerText = text 
        input.value = type 
        input.setAttribute('disabled', 'disabled')
    }
    cancel(){
        document.getElementById('cancel').onclick = function () {
            document.getElementById('form')
            location.href = '#/main-ernings-comsumption'
        }
    }
    searchType(){
        let that =this

        
        const result = document.getElementById('dropdown-menu')
        let content = '' 

        this.categories.forEach((itm)=>{
            content +=`<li><div class="dropdown-item" id='${itm.id}'>${itm.title}</div></li>`
    })
        result.innerHTML = content


        for(let i = 0; i<this.itmType.length;i++){
            this.itmType[i].onclick = function () {
                that.input[1].value = that.itmType[i].textContent
                
            }
        }
    }
    validateForm(){
        let that =this
        let create = document.getElementById('create')

        let y = false
        for(let i = 0;i<this.input.length;i++){
            if(!that.input[i].value){
                y = false
                return
            }else{
                y = true
            }
        }
        if(y === true){
            create.removeAttribute('disabled')
        }
        

    }
    async savingData(id,type,url,metod){
        try{
            const result = await CustomHttp.request(config.host+url,metod,{
                type: type,
                amount: this.input[2].value,
                date: this.input[3].value,
                comment: this.input[4].value,
                category_id:  Number(id)
             })

             if(result){
                 location.href='#/main-ernings-comsumption'
             }

         }catch(e){
              console.log(e)
    }


}



   async showEdit(){
   
        let id = this.routeParams.id

        try{
            const result = await CustomHttp.request(config.host+'/operations/'+id, 'GET')
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
                this.categor = result
                this.input[1].setAttribute('disabled', 'disabled')
                this.input[1].value = this.categor.category
                this.input[2].value = this.categor.amount + '$'
                this.input[3].value = this.categor.date
                this.input[4].value = this.categor.comment
                console.log(this.categor)
            }
        }catch(e){
            console.log(e)
        }
        console.log(id)
    }
    editCategor(){
        let idcategor=null
        let type = this.routeParams.type
        for(let i = 0;i<this.categories.length;i++){
            if(this.categories[i].title===type){
                idcategor= this.categories[i].id
                break
            }
        }
        return idcategor
    }
    editErn(){
        let that = this
        this.showTitle('Редактирование дохода', 'доход')
        this.itmTyp('income')
    
        create.onclick = function () {
            that.savingData(that.editCategor(),'income','/operations/'+that.id,'PUT')
        }
    }
    editCom(){
        let that = this
        this.showTitle('Редактирование расхода','расход')
        this.itmTyp('expense')

        create.onclick = function () {
            that.savingData(that.editCategor(),'expense','/operations/'+that.id,'PUT')
        }
    }
 

test(){
   let itmType = document.getElementById('dropdownMenuButton1')
 
    itmType.addEventListener('change', function(e){
        // if(e.target){
        //     that.idDelite = e.target.getAttribute('value')
        //     console.log(that.idDelite)
        //     that.popapShow()
        // }
        console.log(e.target.itmType)
    })
}
}