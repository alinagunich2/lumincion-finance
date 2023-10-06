import {Form} from './components/form.js'
import {Main} from './components/main.js'
import {MainErnings} from './components/main-ernings-comsumption.js'
import { Creation } from "../src/components/creation.js";
import { Sidebar } from "../src/components/sidebar.js";
import { Categories } from "../src/components/categories.js";
import { CategoriesCreate } from "../src/components/categories-create.js";
import { CategoriesEdit } from "../src/components/categories-edit.js";
import { Sort } from "../src/utills/sort.js";
// import {Choice} from './components/choice.js'
// import {Test} from './components/test.js'
// import {Result} from './components/result.js'
// import {GetResult} from './components/get-result.js'
// import {Auth} from "./services/auth.js"
export class Router{
    static id = null
    constructor(){
        this.boxElement=document.getElementById('box')
        this.stylesElement=document.getElementById('styles')
        this.titleElement=document.getElementById('page-title')
        // this.profileElement=document.getElementById('profile')
        // this.profileFullNameElement=document.getElementById('profile-full-name')
        let that = this
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
                route: '#/main',
                title:'Главная',
                template:'template/main.html',
                styles:'styles/main-ernings-comsumption.css',
                load:()=>{
                    new Sidebar('.tabs'),
                    new Main()
                }
             },
             {
                route: '#/main-ernings-comsumption',
                title:'Доходы-Расходы',
                template:'template/main-ernings-comsumption.html',
                styles:'styles/main-ernings-comsumption.css',
                load:()=>{
                    new MainErnings(),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/creation-ernings',
                title:'Создание доходов',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('create-ern'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/creation-comsumption',
                title:'Создание расходов',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('create-com'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/edit-ernings',
                title:'Редактирование доходов',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('edit-ernings'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/edit-comsumption',
                title:'Редактирование расходов',
                template:'template/creation.html',
                styles:'styles/creation.css',
                load:()=>{
                    new Creation('edit-comsumption'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/ernings',
                title:'Катехории доходов',
                template:'template/ernings-comsumption.html',
                styles:'styles/ernings-comsumption.css',
                load:()=>{
                    new Categories('ernings'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/comsuption',
                title:'Категории расходов',
                template:'template/ernings-comsumption.html',
                styles:'styles/ernings-comsumption.css',
                load:()=>{
                    new Categories('comsuption'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/create-categ-ernings',
                title:'Создание категории доходов',
                template:'template/category-use.html',
                styles:'',
                load:()=>{
                    new CategoriesCreate('ernings'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/create-categ-com',
                title:'Создание категории расходов',
                template:'template/category-use.html',
                styles:'',
                load:()=>{
                    new CategoriesCreate('comsuption'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/edit-categ-ernings',
                title:'Редактирование категории доходов',
                template:'template/category-use.html',
                styles:'',
                load:()=>{
                    new CategoriesEdit('ernings'),
                    new Sidebar('.tabs')
                }
             },
             {
                route: '#/edit-categ-com',
                title:'Редактирование категории расходов',
                template:'template/category-use.html',
                styles:'',
                load:()=>{
                    new CategoriesEdit('comsuption'),
                    new Sidebar('.tabs')
                }
             },

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