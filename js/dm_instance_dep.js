/**
 * @class DM_InstanceDep
 * @constructor
 */
function DM_InstanceDep() {
    this.name     = null;
    this.attrs    = [];
    this.relation = DM_Relation.NONE;
}

/**
 * @method create
 * @param {string} name
 * @param {Array} attrs
 * @relation {DM_Relation} relation
 */
DM_InstanceDep.prototype.create = function (name, attrs, relation) {
    this.name     = name;
    this.attrs    = attrs;
    this.relation = relation;
    return true;
};

