window.onload = function () {
    console.log("Dependency Manager");
};


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


/**
 * @class Stat
 * @constructor
 */
function Stat() {
    this.counter = 0;
    this.enabled  = false;
}

/**
 * @method enable
 */
Stat.prototype.enable = function () {
    this.enabled = true;
};

/**
 * @method disable
 */
Stat.prototype.disable = function () {
    this.enabled = false;
};

/**
 * @method isEnable
 * @return {boolean} enabled attribute value.
 */
Stat.prototype.isEnable = function () {
    return this.enabled;
};

/**
 * @method inc
 * @param {int} amount Amount to increase the counter. By default is 1.
 * @return {int} New counter value.
 */
Stat.prototype.inc = function (amount) {
    this.counter += typeof amount !== 'undefined' ? amount : 1;
    return this.counter;
};

/**
 * @method dec
 * @param {int} amount Amount to decrease the coutner. By default is 1.
 * @return {int} New counter value.
 */
Stat.prototype.dec = function (amount) {
    this.counter -= typeof amount !== 'undefined' ? amount : 1;
    if (this.counter < 0) {
        this.counter = 0;
    }
    return this.counter;
};

/**
 * @method get_counter
 * @return {int} Counter value.
 */
Stat.prototype.get_counter = function () {
    return this.counter;
};


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


/**
 * Class with API for Dependency Manager Module.
 * 
 * @class DependencyManager
 * @constructor
 */
function DependencyManager() {
    this.instances = {};
    this.deps      = {};
}

/**
 * Register a new instance name to the Dependency Manager.
 * 
 * @method register
 * @param {string} name Instance name to be registered.
 * @return {boolean} true if instance was registered. false if instance name was 
 * already registered.
 */
DependencyManager.prototype.register = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        return false;
    } else {
        this.instances[name] = new DM_Instance();
        this.instances[name].register(name);
        return true;
    }
};

/**
 * Unregister an instance name from the Dependency Manager.
 * 
 * @method unregister
 * @param {string} name Instance name to be unregistered.
 * @return {boolean} true if instance was unregistered. false if instance
 * name was not found.
 */
DependencyManager.prototype.unregister = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        this.instances[name].unregister();
        delete this.instances[name];
        return true;
    } else {
        return false;
    }
};

/**
 * @method add_dep
 * @param {string} name
 * @param {string} id
 * @param {int} prio
 * @param {Array} deps
 * @param {Array} callbacks
 * @return {boolean} true if dependency was added. false if instance name was
 * not found.
 */
DependencyManager.prototype.add_dep = function (name, id, prio, deps, callbacks) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        dep = new DM_Dep();
        dep.register(name, id, prio, deps, callbacks);
        instance.add_dep(id, deps);
        return true;
    } 
    return false;
};

/**
 * @method remove_dep
 * @param {string} name
 * @param {string} id
 * @return {boolean} true if dependency was removed. false if it was not found.
 */
DependencyManager.prototype.remove_dep = function (name, id) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        deps = instance.remove_dep(id);
        deps.unregister();
        return true;
    }
    return false;
};

