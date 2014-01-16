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
    /**
     * @property name
     * @type String
     */
    this.name    = null;

    /**
     * @property state
     * @type DM_InstanceState
     */
    this.state   = DM_InstanceState.NONE;

    /**
     * @property deps
     * @type Object
     */
    this.deps    = null;

    /**
     * @property in_deps
     * @type Object
     */
    this.in_deps = null;
}

/**
 * Initialize DM_Instance class variables.
 * 
 * @method init
 * @static
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
    if (!this.deps.hasOwnProperty(id)) {
        this.deps[id] = deps;
        return true;
    }
    return false
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

/**
 * @method add_in_dep
 * @param {String} in_dep_id
 * @return {Boolean}
 */
DM_Instance.prototype.add_in_dep = function (in_dep_id) {
    if (this.in_deps.indexOf(in_dep_id) == -1) {
        this.in_deps.push(in_dep_id);
        return true;
    }
    return false;
};

/**
 * @method remove_in_dep
 * @param {String} in_dep_id
 * @return {Boolean}
 */
DM_Instance.prototype.remove_in_dep = function (in_dep_id) {
    index = this.in_deps.indexOf(in_dep_id);
    if (index != -1) {
        this.in_deps.splice(index, 1);
        return true;
    }
    return false;
};

/**
 * @method notify_create
 * @return {DM_InstanceState} DM_InstanceState.CREATED
 */
DM_Instance.prototype.notify_create = function (name) {
    this.state = DM_InstanceState.CREATED;
    return DM_InstanceState.CREATED;
};

/**
 * @method notify_partial
 * @return {DM_InstanceState} DM_InstanceState.PARTIAL
 */
DM_Instance.prototype.notify_partial = function (name) {
    this.state = DM_InstanceState.PARTIAL;
    return DM_InstanceState.PARTIAL;
};

/**
 * @method notify_active
 * @return {DM_InstanceState} DM_InstanceState.ACTIVE
 */
DM_Instance.prototype.notify_active = function (name) {
    this.state = DM_InstanceState.ACTIVE;
    return DM_InstanceState.ACTIVE;
};

/**
 * @method notify_inactive
 * @return {DM_InstanceState} DM_InstanceState.INACTIVE
 */
DM_Instance.prototype.notify_inactive = function (name) {
    this.state = DM_InstanceState.INACTIVE;
    return DM_InstanceState.INACTIVE;
};

/**
 * @method notify_delete
 * @return {DM_InstanceState} DM_InstanceState.DELETED
 */
DM_Instance.prototype.notify_delete = function (name) {
    this.state = DM_InstanceState.DELETED;
    return DM_InstanceState.DELETED;
};

/**
 * @method notify_destroy
 * @return {DM_InstanceState} DM_InstanceState.DESTROYED
 */
DM_Instance.prototype.notify_destroy = function (name) {
    this.state = DM_InstanceState.DESTROYED;
    return DM_InstanceState.DESTROYED;
};

DM_Instance.prototype.init();

