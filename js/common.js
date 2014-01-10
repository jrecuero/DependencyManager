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
 * @class DM_InstanceState
 * @static
 */
var DM_InstanceState = {
    NONE:      0,
    CREATED:   1,
    PARTIAL:   2,
    ACTIVE:    3,
    INACTIVE:  4,
    DELETED:   5,
    DESTROYED: 6
};


/**
 * @class DM_relation
 * @static
 */
var DM_Relation = {
    NONE:    0,
    MAIN:    1,
    PARTIAL: 2
};

