module.exports = (function () {

    function FormRequest(id,name,includeMeta,user) {
        this.id = id;
        this.name = name;
        this.includeMeta = includeMeta;
        this.user = user;
    }

    function SaveFormRequest(id, name, includeMeta, user, meta) {
        FormRequest.call(this, id, name, includeMeta,user);
        this.formMeta = meta;
    }

    SaveFormRequest.prototype = Object.create(FormRequest.prototype);
    SaveFormRequest.prototype.constructor = SaveFormRequest;

    return {
        FormRequest: FormRequest,
        SaveFormRequest: SaveFormRequest
    };
})();