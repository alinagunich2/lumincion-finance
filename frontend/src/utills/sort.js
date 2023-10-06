
export class Sort {
 
   static sorting(){
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
}