import {Auth} from "../services/auth.js"

export  class Form  {

    constructor(page){
        this.page=page;
        this.agreeElement=null;
        this.processElement= null;
    
            const accessToken = localStorage.getItem(Auth.accessTokenKey)
            if(accessToken){
                location.href='#/main-ernings-comsumption';
                return
            }
    
        this.fields =[
            {
                name:'email',
                id: 'email',
                element: null,
                regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                valid: false,
            }, 
            {
                name:'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            }, 
        ];
        
        if(this.page==='signup'){
            this.fields.unshift(
                {
                    name:"name",
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false,
                },
                {
                    name:'lastName',
                    id:'last-name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false,
                },
            )
        }

        const that = this;

            this.fields.forEach((itm)=>{
                itm.element = document.getElementById(itm.id)
                itm.element.onchange=function(){
                    that.validateField.call(that, itm, this); 
                }
            })

            this.processElement = document.getElementById('process')
            this.processElement.onclick=function(){
                that.processForm()
                that.emailLocal()
            }

            if(this.page==='signup'){
                this.agreeElement = document.getElementById('agree');
                this.agreeElement.onchange = function(){
                    that.validateForm()
                }

        
    };
   
    }
}