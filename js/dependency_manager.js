window.onload = function () {
    console.log("Dependency Manager");
};

/**
Check if the object contains any attribute or not.

@method empty_obj
@param {Object} obj Object to check for attributes.
@return {boolean} true if object does not have attributes.
**/
function empty_obj(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

// DM_InstanceState enum values
var DM_InstanceState = {
    NONE:      0,
    CREATED:   1,
    PARTIAL:   2,
    ACTIVE:    3,
    INACTIVE:  4,
    DELETED:   5,
    DESTROYED: 6
};

// DM_Relation enum values
var DM_Relation = {
    NONE:    0,
    MAIN:    1,
    PARTIAL: 2
};

/**
@class Stat
@constructor
**/
function Stat() {
    this.my_counter = 0;
    this.my_enable  = false;
}

Stat.prototype.enable = function () {
    this.my_enable = true;
};

Stat.prototype.disable = function () {
    this.my_enable = false;
};

Stat.prototype.isEnable = function () {
    return this.my_enable;
};

Stat.prototype.inc = function (amount) {
    this.my_counter += typeof amount !== 'undefined' ? amount : 1;
    return this.my_counter;
};

Stat.prototype.dec = function (amount) {
    this.my_counter -= typeof amount !== 'undefined' ? amount : 1;
    if (this.my_counter < 0) {
        this.my_counter = 0;
    }
    return this.my_counter;
};

Stat.prototype.get_counter = function () {
    return this.my_counter;
};

/**
@class DM_InstanceDep
@constructor
**/
function DM_InstanceDep() {
    this.name     = null;
    this.attrs    = [];
    this.relation = DM_Relation.NONE;
}

DM_InstanceDep.prototype.create = function (name, attrs, relation) {
    this.name     = name;
    this.attrs    = attrs;
    this.relation = relation;
    return true;
};

/**
@class DM_Dep
@constructor
**/
function DM_Dep() {
    this.name      = null;
    this.id        = null;
    this.prio      = null;
    this.deps      = {};
    this.callbacks = {};
}

DM_Dep.prototype.register = function (name, id, prio, deps, callbacks) {
    this.name      = name;
    this.id        = id;
    this.prio      = prio;
    this.deps      = deps;
    this.callbacks = callbacks;
    return true;
};

/**
Class methods required for handling individual instances registered
to the Dependency Manager.

One instance is an entry that Depedency Manager will be used as a 
dependency or to contain dependencies.

@class DM_Instance
@constructor
**/
function DM_Instance() {
    this.name    = null;
    this.state   = DM_InstanceState.NONE;
    this.deps    = null;
    this.in_deps = null;
}

/**
Initialize DM_Instance class variables.

@method init
**/
DM_Instance.prototype.init = function () {
    DM_Instance.prototype.ID      = 0;
    DM_Instance.prototype.COUNTER = 0;
};

/**
Reset ID and COUNTER class attributes.

@method cleanID
**/
DM_Instance.prototype.cleanID = function () {
    DM_Instance.prototype.ID      = 0;
    DM_Instance.prototype.COUNTER = 0;
    return true;
};

/**
Register a new name to be used for the instance.

@method register
@param {string} name Instance name to be used.
@return {boolean} true.
**/
DM_Instance.prototype.register = function (name) {
    this.name = name;
    this.state = DM_InstanceState.CREATED;
    DM_Instance.prototype.ID++;
    DM_Instance.prototype.COUNTER++;
    return true;
};

/**
Unregister all instance values.

@method unregister
@return {boolean} true.
**/
DM_Instance.prototype.unregister = function () {
    this.name    = null;
    this.state   = DM_InstanceState.NONE;
    this.deps    = null;
    this.in_deps = null;
    DM_Instance.prototype.COUNTER--;
    return true;
};

DM_Instance.prototype.init();

/**
Class with API for Dependency Manager Module.

@class DependencyManager
@constructor
**/
function DependencyManager() {
    this.instances = {};
    this.deps      = {};
}

/**
Register a new instance name to the Dependency Manager.

@method register
@param {string} name Instance name to be registered.
@return {boolean} true if instance was registered. false if instance name was 
already registered.
**/
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
Unregister an instance name from the Dependency Manager.

@method unregister
@param {string} name Instance name to be unregistered.
@return {boolean} true if instance was unregistered. false if instance
name was not found.
**/
DependencyManager.prototype.unregister = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        this.instances[name].unregister();
        delete this.instances[name];
        return true;
    } else {
        return false;
    }
};
