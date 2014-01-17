/**
 * @class DM_DepAttrs
 * @constructor
 * @param {string} name
 * @param {Array} attrs
 * @return {DM_Relation} relation
 */
function DM_DepAttrs (name, attrs, relation) {
    /**
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * @property attrs
     * @type Array
     */
    this.attrs = attrs;

    /**
     * @property relation
     * @type DM_Relation
     */
    this.relation = DM_Relation.NONE;
    if (relation != null) {
        this.relation = relation;
    }
}

