/**
 * @class DM_Dep
 * @constructor
 */
function DM_Dep() {
    this.name      = null;
    this.id        = null;
    this.prio      = null;
    this.deps      = {};
    this.callbacks = {};
}

/**
 * @method register
 * @param {string} name
 * @param {string} id
 * @param {int} prio
 * @param {Array} deps
 * @param {Array} callbacks
 * @return {boolean} true
 */
DM_Dep.prototype.register = function (name, id, prio, deps, callbacks) {
    this.name      = name;
    this.id        = id;
    this.prio      = prio;
    this.deps      = deps;
    this.callbacks = callbacks;
    return true;
};

/**
 * @method unregister
 * @return {boolean} true
 */
DM_Dep.prototype.unregister = function () {
    this.name      = null;
    this.id        = null;
    this.prio      = null;
    this.deps      = {};
    this.callbacks = {};
};
