import { Balance } from "../utills/balanse.js";
export class Sidebar {
    constructor(target, config) {

      let balance = new Balance().bal()


      this.ern = document.getElementById('ern')
      this.com = document.getElementById('com')
      

      const defaultConfig = {};
      this._config = Object.assign(defaultConfig, config);
      this._elTabs = typeof target === 'string' ? document.querySelector(target) : target;
      this._elButtons = this._elTabs.querySelectorAll('.tabs__btn');
      this._elPanes = this._elTabs.querySelectorAll('.tabs__pane');
      this._eventShow = new Event('tab.itc.change');
      this._init();
      this._events();

      this.openMain();
      this.openMainSek();
      this.openErn();
      this.openCom();
    }
    _init() {
      this._elTabs.setAttribute('role', 'tablist');
      this._elButtons.forEach((el, index) => {
        el.dataset.index = index;
        el.setAttribute('role', 'tab');
        this._elPanes[index].setAttribute('role', 'tabpanel');
      });
    }
    show(elLinkTarget) {
      const elPaneTarget = this._elPanes[elLinkTarget.dataset.index];
      const elLinkActive = this._elTabs.querySelector('.tabs__btn_active');
      const elPaneShow = this._elTabs.querySelector('.tabs__pane_show');
      if (elLinkTarget === elLinkActive) {
        return;
      }
      elLinkActive ? elLinkActive.classList.remove('tabs__btn_active') : null;
      elPaneShow ? elPaneShow.classList.remove('tabs__pane_show') : null;
      elLinkTarget.classList.add('tabs__btn_active');
      elPaneTarget.classList.add('tabs__pane_show');
      this._elTabs.dispatchEvent(this._eventShow);
      elLinkTarget.focus();
    }
    showByIndex(index) {
      const elLinkTarget = this._elButtons[index];
      elLinkTarget ? this.show(elLinkTarget) : null;
    };
    _events() {
      this._elTabs.addEventListener('click', (e) => {
        const target = e.target.closest('.tabs__btn');
        if (target) {
          e.preventDefault();
          this.show(target);
        }
      });
    }



    openMain(){
    
    
        document.getElementById('main').onclick = function(){
            location.href = '#/main'
        }
    };
    openMainSek(){
        document.getElementById('main-sek').onclick = function(){
            location.href = '#/main-ernings-comsumption'
        }
    };
    openErn(){
      let that = this
        document.getElementById('category').onclick = function(){
          that.com.classList.remove('activ-comsumotion')
          that.ern.classList.add('activ-comsumotion')
            location.href = '#/ernings'
        }
        document.getElementById('ern').onclick = function(){
          that.com.classList.remove('activ-comsumotion')
        that.ern.classList.add('activ-comsumotion')
            location.href = '#/ernings'
        }
    };
    openCom(){
      let that = this
      document.getElementById('com').onclick = function(){
        that.com.classList.add('activ-comsumotion')
        that.ern.classList.remove('activ-comsumotion')
        location.href = '#/comsuption'
    }
    };



    
   
  }



