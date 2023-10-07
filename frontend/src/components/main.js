import { CustomHttp } from "../services/custon-http.js";
import configs from "../../config/configs.js"

export class Main{
    constructor(){
        document.getElementById('main').classList.remove('activ')

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
        

        this.result = null
        this.Month = new Date().getMonth()+1

        this.dateFromTo = new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()+'&dateTo='+new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()
        this.dateTo='&dateTo='+new Date().getFullYear().toString()+'-'+this.Month.toString()+'-'+new Date().getDate().toString()
        this.nowYear = new Date().getFullYear().toString()
        this.nowMonth = this.Month.toString()
        this.nowDay = new Date().getDate().toString()

        this.canvasErn = null
        this.contextErn = null
        this.canvasComs = null
        this.contextCom = null
        
       

        this.comsupt=[]
        this.erning = []


        this.dataCom =[]
        this.amountsCom = []
        this.dataErn=[]
        this.amountsErn=[]
       
        this.sorting()
       
        
        

        
    }

    async int(data = this.dateFromTo){
        try{

            const result = await CustomHttp.request(configs.host+'/operations?period=interval&dateFrom='+data)
                
            if(result){
                if(result.error){
                    throw new Error(result.message)
                }
                // this.chart.destroy()
                
                this.result = result

                document.getElementById('canv1').innerHTML = ``
                document.getElementById('canv2').innerHTML = ``
        

                document.getElementById('canv1').innerHTML = `<canvas class="" id="erning"></canvas>`
                document.getElementById('canv2').innerHTML = `<canvas  id="comsumpt"></canvas>`

                
                this.canvasErn = document.getElementById('erning')
                this.contextErn = this.canvasErn.getContext('2d')
                this.canvasComs = document.getElementById('comsumpt')
                this.contextCom = this.canvasComs.getContext('2d')



                this.dataCom =[]
        this.amountsCom = []
        this.dataErn=[]
        this.amountsErn=[]
        this.comsupt=[]
        this.erning = []
                this.canv()
               
            }
        }catch(e){
            console.log(e)
        }
    }
    canv(){
        
        for(let i =0; i<this.result.length;i++){
            if(this.result[i].type === 'expense'){
                this.comsupt.push(this.result[i])
            }else{
                this.erning.push(this.result[i])
            }
        }

        this.sort('expense',this.comsupt)
        this.sort('income',this.erning)
    
        this.showChar(this.amountsCom,this.dataCom,this.contextCom)
        this.showChar(this.amountsErn,this.dataErn,this.contextErn)
    }

    sorting(){
        const that = this
        let data = new Date();

        this.int(this.dateFromTo)

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
    

    showChar(amountsCom,dataCom, context){
        let data  = {
            labels: dataCom,
            datasets:[{
                data: amountsCom,
            }]
        }
        let config = {
            type: 'pie',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                }
              }
            },
        }


        let chart = new Chart(context,config)
      
        
    }

    sort(type,arry){
        var holder = {};
            
        arry.forEach(function(d) {
          if (holder.hasOwnProperty(d.category)) {
            holder[d.category] = holder[d.category] + d.amount;
          } else {
            holder[d.category] = d.amount;
          }
        });
        
        var sameComsart = [];
        
        for (var prop in holder) {
          sameComsart.push({ category: prop, amount: holder[prop] });
        }

        for(let i =0; i<sameComsart.length;i++){
            if(type === 'expense'){
                this.dataCom.push(sameComsart[i].category)
                this.amountsCom.push(sameComsart[i].amount)
            } else if(type === 'income'){
                this.dataErn.push(sameComsart[i].category)
                this.amountsErn.push(sameComsart[i].amount)
            }    
        }
      
    }
}