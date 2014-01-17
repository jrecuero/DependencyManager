/**
 * @class DM_DepAttrs
 * @constructor
 */
function DM_DepAttrs() {
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
DM_DepAttrs.prototype.create = function (name, attrs, relation) {
    this.name     = name;
    this.attrs    = attrs;
    this.relation = relation;
    return this;
};

