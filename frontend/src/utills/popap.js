export class Popap{
    constructor(){
        
    }
    static popap =  document.getElementById('popap')
        static btn1 = document.getElementById('popap-btn-f')
        static btn2 = document.getElementById('popap-btn-s')

    static popapText(text, btn1, btn2){
        this.popap.style.display='block';
        document.getElementById('popap-text').innerText = text;
        this.btn1.innerText = btn1;
        this.btn2.innerText = btn2;
    }
    static popapHidden(){
        let that = this
        this.btn2.onclick = function () {
            that.popap.style.display='none';
        }
    }
}