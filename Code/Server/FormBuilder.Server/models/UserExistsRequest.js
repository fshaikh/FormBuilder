module.exports = (function(){
    function UserExistsRequest(type,value){
        this.type = type;
        this.value = value;
    }

    return{
        UserExistsRequest : UserExistsRequest
    };
})();