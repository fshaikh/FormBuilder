// User model

module.exports = (function(){
    function User(user,password,token,id,isGuestAuth,salt){
        this.userName = user;
        this.token = token;
        this.id = id;
        this.isGuestAuth = isGuestAuth;
        this.password = password;
        this.salt = salt;
    }

    return{
        User:User
    };

})();