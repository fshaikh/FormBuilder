module.exports = (function () {

    function FormRequest(id,name,includeMeta) {
        this.id = id;
        this.name = name;
        this.includeMeta = includeMeta;
    }

    return {
        FormRequest: FormRequest
    }
})();