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

    function DeleteFormRequest(id, name, includeMeta, user, isSoftDelete) {
        FormRequest.call(this, id, name, includeMeta, user);
        this.isSoftDelete = isSoftDelete;
    }

    DeleteFormRequest.prototype = Object.create(FormRequest.prototype);
    DeleteFormRequest.prototype.constructor = DeleteFormRequest;

    return {
        FormRequest: FormRequest,
        SaveFormRequest: SaveFormRequest,
        DeleteFormRequest: DeleteFormRequest
    };
})();