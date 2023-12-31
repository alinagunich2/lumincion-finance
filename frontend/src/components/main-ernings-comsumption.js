import { CustomHttp } from "../services/custon-http.js";
import { Popap } from "../utills/popap.js";
import { Balance } from "../utills/balanse.js";
import configs from "../../config/configs.js"


export class MainErnings{
    static  idDelite = null
    static  interval = null
     constructor(){
        let buttom = document.querySelectorAll('.period-button')
        buttom.forEach((itm)=>{
            itm.addEventListener('click', function(){
                buttom.forEach((btn)=>{
                    btn.style.backgroundColor='transparent'
                    btn.style.color='#6c757d'
                })
                this.style.backgroundColor='#6c757d'
                this.style.color='white'
            })
        })
        this.data =null

        this.Month = new Date().getMonth()+1

        this.dateFromTo = new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()+'&dateTo='+new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()
        this.dateTo='&dateTo='+new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()
        this.nowYear = new Date().getFullYear().toString()
        this.nowMonth = this.Month.toString()
        this.nowDay = new Date().getDate().toString()
        this.int()
        this.sorting()
        this.changPage()
    }
  
    async int(data = this.dateFromTo){
        try{

            const result = await CustomHttp.request(configs.host+'/operations?period=interval&dateFrom='+data)
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }

                this.data = result
                this.processData()
                
                if(this.data){
                    this.deleteItm()
                }
            }
        }catch(e){
            console.log(e)
        }
    }
    processData(){
        const result = document.getElementById('tbody')
        let content = '' 

        this.data.forEach((itm,index)=>{
            content +=`<tr class="d-flex border-top" scope="row" id='${itm.id}'>
            <td style="width:13%" class=" px-0 text-center">${index+1}</td>
            <td style="width:13%" class="px-0 text-center ${itm.type==='expense'?'comsu':'ernin'}">${itm.type==='expense'?'расход':'доход'}</td>
            <td style="width:13%" class="px-0 text-center">${itm.category}</td>
            <td style="width:13%" class="px-0 text-center">${itm.amount}$</td>
            <td style="width:13%" class="px-0 text-center">${itm.date}</td>
            <td style="width:30%" class="ps-5 py-3 text-start ">${itm.comment}</td>
            <td style="width:5%" class=" text-end">
            <span value="${itm.id}" class="me-2 delete">
                <svg value="${itm.id}" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path value="${itm.id}" d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z" fill="black"/>
                    <path value="${itm.id}" d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z" fill="black"/>
                    <path value="${itm.id}" d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z" fill="black"/>
                    <path value="${itm.id}" fill-rule="evenodd" clip-rule="evenodd" d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z" fill="black"/>
                    </svg>                                
                </span>
            <a href='#/${itm.type==='expense'?'edit-comsumption':'edit-ernings'}?id=${itm.id}&type=${itm.category}' class="create">
                <svg  width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z" fill="black"/>
                    </svg>                                
            </a>
            </td>
        </tr>`
    })
        result.innerHTML = content
    }
    sorting(){
        const that = this
        let data = new Date();

        document.getElementById('today').onclick = function () {
            that.interval = that.dateFromTo
            that.int(that.interval)
        }

        document.getElementById('week').onclick = function () {
            let startDate = new Date();
            startDate.setDate(data.getDate() - 7);

            that.interval = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate()+that.dateTo
            that.int(that.interval)
        }

        document.getElementById('month').onclick = function () {
            let startDate = new Date();
            startDate.setMonth(data.getMonth() - 1);

            that.interval = startDate.getFullYear()+'-'+startDate.getMonth()+'-'+startDate.getDate()+that.dateTo
            that.int(that.interval)
        }
        document.getElementById('year').onclick = function () {
            that.interval = that.nowYear-1+'-'+that.nowMonth+'-'+that.nowDay+that.dateTo
            that.int(that.interval)
        }
        document.getElementById('all').onclick = function () {
            that.interval = '1999-01-01&dateTo=2300-09-13'
            that.int(that.interval)
        }
        document.getElementById('interval').onclick = function () {
            let dateFrom = document.getElementById('dateFrom').value
            let dateTo = document.getElementById('dateTo').value
            
            that.interval = dateFrom+'&dateTo='+dateTo
            that.int(that.interval)
        }
    }
   async delete(itm){
        try{

            const result = await CustomHttp.request(configs.host+'/operations/'+itm, 'DELETE')
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
            this.int(this.interval)
            new Balance().bal()
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
        Popap.popapText('Вы действительно хотите удалить операцию?', 'Да, удалить', 'Не удалять')
        Popap.popapHidden()

        let that = this

        document.getElementById('popap-btn-f').onclick = function () {
            document.getElementById('popap').style.display='none'
            that.delete(that.idDelite)
        }
    }
    
    changPage(){
        let that = this
        document.getElementById('create-ern').onclick = function () {
            location.href = '#/creation-ernings'
        }
        document.getElementById('create-com').onclick = function () {
            location.href = '#/creation-comsumption'
        }
    }

}