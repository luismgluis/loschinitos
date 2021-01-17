class globals {
    /**
     * 
     * @param {Object} data this.$globals
     */
    constructor(data = {}){
        this.myuid = data.myuid || "";
        this.actualpage = data.actualpage || "";
    }
    setMyuid(myuid){
        this.myuid = myuid;
    }
    setActualpage(actualpage){
        this.actualpage = actualpage;
        console.log(this.actualpage);
        
    }
}
export default globals;