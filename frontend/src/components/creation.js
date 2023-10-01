import { CustomHttp } from "../services/custon-http.js";
import config from "../../config/config.js"

export class Creation {
    static idItm = null
    
    constructor(page){
        this.page=page;
        this.categories =null
        this.input = document.getElementsByTagName('input')
        
        if(this.page === 'create-ern'){
            this.createErn()
        }else{
            this.createCom()
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
        this.itmType('income')
        let that = this
        create.onclick = function () {
            that.savingData('income')
        }
    }
    createCom(){
        this.showTitle('Создание расхода','расход')
        this.itmType('expense')
        let that = this
        create.onclick = function () {
            that.savingData('expense')
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
   async itmType(data){
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
    searchType(){
        let that =this

        
        const result = document.getElementById('dropdown-menu')
        let content = '' 

        this.categories.forEach((itm)=>{
            content +=`<li><div class="dropdown-item" id='${itm.id}'>${itm.title}</div></li>`
    })
        result.innerHTML = content

        let itmType = document.getElementsByClassName('dropdown-item')
        for(let i = 0; i<itmType.length;i++){
            itmType[i].onclick = function () {
                that.input[1].value = itmType[i].textContent
                that.idItm=itmType[i].id
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

    async savingData(type){
        try{
            const result = await CustomHttp.request(config.host+'/categories/'+type,'POST',{
                type: type,
                amount: this.input[2].value,
                date: this.input[3].value,
                comment: this.input[4].value,
                category_id: this.idItm
             })

             if(result){
                 location.href='#/main-ernings-comsumption'
             }

         }catch(e){
              console.log(e)
    }


}}