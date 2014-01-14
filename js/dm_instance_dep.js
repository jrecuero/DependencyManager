/**
 * @class DM_InstanceDep
 * @constructor
 */
function DM_InstanceDep() {
    /**
     * @property name
     * @type String
     */
    this.name     = null;

    /**
     * @property attrs
     * @type Array
     */
    this.attrs    = [];

    /**
     * @property relation
     * @type DM_Relation
     */
    this.relation = DM_Relation.NONE;
}

/**
 * @method create
 * @param {string} name
 * @param {Array} attrs
 * @return {DM_Relation} relation
 */
DM_InstanceDep.prototype.create = function (name, attrs, relation) {
    this.name     = name;
    this.attrs    = attrs;
    this.relation = relation;
    return true;
};

