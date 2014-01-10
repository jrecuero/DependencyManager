/**
 * Class methods required for handling individual instances registered
 * to the Dependency Manager.
 * 
 * One instance is an entry that Depedency Manager will be used as a 
 * dependency or to contain dependencies.
 * 
 * @class DM_Instance
 * @constructor
 */
function DM_Instance() {
    this.name    = null;
    this.state   = DM_InstanceState.NONE;
    this.deps    = null;
    this.in_deps = null;
}

/**
 * Initialize DM_Instance class variables.
 * 
 * @method init
 */
DM_Instance.prototype.init = function () {
    DM_Instance.prototype.ID      = 0;
    DM_Instance.prototype.COUNTER = 0;
};

/**
 * Reset ID and COUNTER class attributes.
 * 
 * @method cleanID
 * @return {boolean} true
 */
DM_Instance.prototype.cleanID = function () {
    DM_Instance.prototype.ID      = 0;
    DM_Instance.prototype.COUNTER = 0;
    return true;
};

/**
 * Register a new name to be used for the instance.
 * 
 * @method register
 * @param {string} name Instance name to be used.
 * @return {boolean} true.
 */
DM_Instance.prototype.register = function (name) {
    this.name    = name;
    this.state   = DM_InstanceState.CREATED;
    this.deps    = {};
    this.in_deps = [];
    DM_Instance.prototype.ID++;
    DM_Instance.prototype.COUNTER++;
    return true;
};

/**
 * Unregister all instance values.
 * 
 * @method unregister
 * @return {boolean} true.
 */
DM_Instance.prototype.unregister = function () {
    this.name    = null;
    this.state   = DM_InstanceState.NONE;
    this.deps    = null;
    this.in_deps = null;
    DM_Instance.prototype.COUNTER--;
    return true;
};

/**
 * @method add_dep
 * @param {string} id
 * @param {DM_Dep} deps Dependencies.
 * @return {boolean} true
 */
DM_Instance.prototype.add_dep = function (id, deps) {
    this.deps[id] = deps;
    return true;
};

/**
 * @method remove_dep
 * @param {string} id 
 * @return {DM_Dep} null if not found.
 */
DM_Instance.prototype.remove_dep = function (id) {
    if (this.deps.hasOwnProperty(id)) {
        deps = this.deps[id];
        delete this.deps[id];
        return deps;
    }
    return null;
};

DM_Instance.prototype.init();

