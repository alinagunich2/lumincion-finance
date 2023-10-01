import {Form} from './components/form.js'
import {MainErnings} from './components/main-ernings-comsumption.js'
import { Creation } from "../src/components/creation.js";
// import {Choice} from './components/choice.js'
// import {Test} from './components/test.js'
// import {Result} from './components/result.js'
// import {GetResult} from './components/get-result.js'
// import {Auth} from "./services/auth.js"
export class Router{
    constructor(){
        this.boxElement=document.getElementById('box')
        this.stylesElement=document.getElementById('styles')
        this.titleElement=document.getElementById('page-title')
        // this.profileElement=document.getElementById('profile')
        // this.profileFullNameElement=document.getElementById('profile-full-name')

        this.routes=[
             {
                route: '#/',
                title:'Вход',
                template:'template/login.html',
                styles:'styles/login.css',
                load:()=>{
                    new Form('login')
                }
             },
             {
                route: '#/signup',
                title:'Создайте аккаунт',
                template:'template/signup.html',
                styles:'styles/signup.css',
                load:()=>{
                    new Form('signup')
                }
             },
             {
                route: '#/category-use',
                title:'category-use',
                template:'template/category-use.html',
                styles:'',
                load:()=>{
                    
                }
             },
             {
                route: '#/creation-ernings',
                title:'creation',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('create-ern')
                }
             },
             {
                route: '#/creation-comsumption',
                title:'creation',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('create-com')
                }
             },
             {
                route: '#/ernings-comsumption',
                title:'ernings-comsumption',
                template:'template/ernings-comsumption.html',
                styles:'styles/ernings-comsumption.css',
                load:()=>{
                   
                }
             },
             {
                route: '#/main-ernings-comsumption',
                title:'main-ernings-comsumption',
                template:'template/main-ernings-comsumption.html',
                styles:'styles/main-ernings-comsumption.css',
                load:()=>{
                    new MainErnings()
                }
             }
        ]
    }
    async openRoute(){
        const urlRoute = window.location.hash.split('?')[0]

        // if(urlRoute==='#/logout'){
        //     await Auth.logout()
        //     window.location.href='#/'
        //     return
        // }

        const newRoute = this.routes.find(item=>{
            return item.route === urlRoute
        })
        
        if(!newRoute){
            window.location.href='#/'
            return
        }
        this.boxElement.innerHTML = await fetch(newRoute.template).then(response=>response.text())
        this.stylesElement.setAttribute('href',newRoute.styles)
        this.titleElement.innerText = newRoute.title

        // const userInfo = Auth.getUserInfo()
        // const accessToken = localStorage.getItem(Auth.accessTokenKey)

        // if(userInfo&&accessToken){
        //     this.profileElement.style.display='flex'
        //     this.profileFullNameElement.innerText=userInfo.fullName
        // }else{
        //     this.profileElement.style.display='none'
        // }

        newRoute.load()
    }
}