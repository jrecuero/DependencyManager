/**
 * Check if the object contains any attribute or not.
 * 
 * @method empty_obj
 * @param {Object} obj Object to check for attributes.
 * @return {boolean} true if object does not have attributes.
 */
function empty_obj(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}


/**
 * States an instance can have in dependency manager.
 *
 * @class DM_InstanceState
 * @static
 */
var DM_InstanceState = {
    NONE:      "none",
    CREATED:   "created",
    PARTIAL:   "partial",
    ACTIVE:    "active",
    INACTIVE:  "inactive",
    DELETED:   "deleted",
    DESTROYED: "destroyed"
};


/**
 * Relation an instance can have with dependencies.
 *
 * @class DM_relation
 * @static
 */
var DM_Relation = {
    NONE:    0,
    MAIN:    1,
    PARTIAL: 2
};

