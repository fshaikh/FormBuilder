module.exports = (function () {
    function AuthenticationType() { }

    AuthenticationType.Guest = 0;
    AuthenticationType.Token = 1;
    AuthenticationType.OAuth = 2;

    return {
        AuthenticationType: AuthenticationType
    };
})();