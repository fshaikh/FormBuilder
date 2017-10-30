// Enum tht represents the value type prvided for checking if a user exists

module.exports = (function () {
    function TypeEnum() { }

    TypeEnum.Username = 0;
    TypeEnum.Email = 1;

    return {
        TypeEnum: TypeEnum
    };
})();