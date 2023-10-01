import {Auth} from "../services/auth.js"
import { CustomHttp } from "../services/custon-http.js";
import config from "../../config/config.js"
export  class Form  {

    constructor(page){
        this.page=page;
        this.processElement= null;
    
            const accessToken = localStorage.getItem(Auth.accessTokenKey)
            // if(accessToken){
            //     location.href='#/';
            //     return
            // }
    
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
                    name:"fullname",
                    id: 'fullname',
                    element: null,
                    regex: /^([А-Я][а-я]*\s+)+[А-Я][а-я]*\s*$/,
                    valid: false,
                },
                {
                    name:'rep-password',
                    id:'rep-password',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
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
            }

            if(this.page==='signup'){
                
            }
    
   
    }
    validateField(field,element){
        if(!element.value || !element.value.match(field.regex)){ 
            element.style.borderColor = 'red'
            field.valid=false
        }else{
            element.removeAttribute('style')
            field.valid=true
        }
        if(this.page==='signup'){
            const repPassword = document.getElementById('rep-password')
            if(document.getElementById('password').value === repPassword.value){
                this.processElement.removeAttribute('disabled')
                repPassword.removeAttribute('style')
            }else{
                repPassword.style.borderColor = 'red'
                this.processElement.setAttribute('disabled', 'disabled')
                return
            }
            
        }
        this.validateForm()
    }
    validateForm(){
        const validForm = this.fields.every(itm => itm.valid)
        
        if(validForm){
            this.processElement.removeAttribute('disabled')
        }else{
            this.processElement.setAttribute('disabled', 'disabled')
        }
        return validForm
    }
    
async processForm(){
    if(this.validateForm()){
        const email = this.fields.find(itm=>itm.name==='email').element.value
        const password = this.fields.find(itm=>itm.name==='password').element.value
        if(this.page === 'signup'){
            try{

                const result = await CustomHttp.request(config.host+'/signup', "POST", {
                        name: this.fields.find(itm => itm.name === 'fullname').element.value.split(' ')[1],
                        lastName: this.fields.find(itm => itm.name === 'fullname').element.value.split(' ')[0],
                        email: email,
                        password: password,
                        passwordRepeat:this.fields.find(itm => itm.name === 'rep-password').element.value,
                    })
                    
                if(result){
                    if(!result.user || result.error){
                        throw new Error(result.message)
                    }
                }
            }catch(e){
               return console.log(e)
            }
            
                }
                    try{

                        const result = await CustomHttp.request(config.host+'/login', "POST", {
                                email: email,
                                password: password,
                                rememberMe: false,
                            })
                            
                        if(result){
                            if(!result.tokens.accessToken || !result.tokens.refreshToken 
                                ||!result.user.name || !result.user.lastName || !result.user.id){
                                throw new Error(result.message)
                            }
                            
                            Auth.setTokens(result.tokens.accessToken,result.tokens.refreshToken)
                            location.href = '#/main-ernings-comsumption'
                        }
                    }catch(e){
                        console.log(e)
                    }
             }
    }
}

