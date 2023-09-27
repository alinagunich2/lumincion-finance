import {Auth} from "../services/auth.js"

export  class Form  {

    constructor(page){
        this.page=page;
        this.agreeElement=null;
        this.processElement= null;
    
            const accessToken = localStorage.getItem(Auth.accessTokenKey)
            // if(accessToken){
            //     location.href='#/main-ernings-comsumption';
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
            }

            // if(this.page==='signup'){
            //     this.agreeElement = document.getElementById('agree');
            //     this.agreeElement.onchange = function(){
            //         that.validateForm()
            //     }

        
    
   
    }
    validateForm(){
        const validForm = this.fields.every(itm => itm.valid)
        const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm
        if(isValid){
            this.processElement.removeAttribute('disabled')
        }else{
            this.processElement.setAttribute('disabled', 'disabled')
        }
        return isValid
    }
    async processForm(){

        if(this.validateForm()){
            const email = this.fields.find(itm=>itm.name==='email').element.value
            const password = this.fields.find(itm=>itm.name==='password').element.value
            
            if(this.page=='signup'){

                try{
                   const result = await CustomHttp.request(config.host+'/signup','POST',{
                        name:this.fields.find(itm=>itm.name==='name').element.value,
                        lastName:this.fields.find(itm=>itm.name==='lastName').element.value,
                        email:email,
                        password:password,
                    })

                    if(result){
                        if(result.error||!result.user){
                            throw new Error (result.message)
                        }
                    }

                }catch(e){
                    return console.log(e)
                }
            }
                try{
                    const result = await CustomHttp.request(config.host+'/login','POST',{
                         email:email,
                         password:password,
                     })

                     if(result){
                         if(result.error||!result.accessToken || !result.refreshToken||!result.fullName||!result.userId){
                             throw new Error (result.message)
                         }
                         Auth.setTokens(result.accessToken,result.refreshToken)
                         Auth.setUserInfo({
                            fullName: result.fullName,
                            userId: result.userId
                         })
                         location.href='#/choice'
                     }

                 }catch(e){
                      console.log(e)
            }

            // let paramString = ''
            // this.fields.forEach(itm=>{
            //     paramString += (!paramString ? '?':'&') + itm.name + '=' + itm.element.value
            // })

            // location.href='#/choice'+paramString
        }
    }
}