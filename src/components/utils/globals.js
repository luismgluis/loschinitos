class globals {
    /**
     * 
     * @param {Object} data this.$globals
     */
    constructor(data = {}){
        if(typeof data.updateClientesPageFn !== 'undefined'){
            return data;//con esto devolvemos la misma clase creada originalmente
        }
        this.myuid = data.myuid || "";
        this.actualpage = data.actualpage || "";
        this.updateClientesPageFn = data.updateClientesPageFn || function () {}
    }
    setMyuid(myuid){
        this.myuid = myuid;
    }
    setActualpage(actualpage){
        this.actualpage = actualpage;
        console.log(this.actualpage);
    }
    setUpdateClientesPageFn(fn){
        this.updateClientesPageFn = fn;
    }
    UpdateClientesPage(){
        if(typeof this.updateClientesPageFn !== 'undefined'){
            this.updateClientesPageFn();
        }
    }
}
export default globals;