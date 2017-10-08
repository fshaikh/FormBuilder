module.exports = (function(){
    function AuthenticationInfo(username,password,rememberMe){
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
    }

    return{
        AuthenticationInfo: AuthenticationInfo
    };
})();