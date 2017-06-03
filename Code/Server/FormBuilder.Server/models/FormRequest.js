module.exports = (function () {

    function FormRequest(id,name,includeMeta,user) {
        this.id = id;
        this.name = name;
        this.includeMeta = includeMeta;
        this.user = user;
    }

    return {
        FormRequest: FormRequest
    }
})();