/**
 * @class DM_Dep
 * @constructor
 * @param {string} name
 * @param {string} id
 * @param {int} prio
 * @param {Array} deps
 * @param {Array} callbacks
 */
function DM_Dep (name, id, prio, deps, callbacks) {
    /**
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * @property id
     * @type String
     */
    this.id = id;

    /**
     * @property prio
     * @type Int
     */
    this.prio = prio;

    /**
     * @property deps
     * @type Object
     */
    this.deps = deps;

    /**
     * @property callbacks
     * @type Object
     */
    this.callbacks = callbacks;
}

