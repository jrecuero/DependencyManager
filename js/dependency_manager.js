window.onload = function() {
    console.log("Dependency Manager");
}

// empty_obj method
// returns true if object does not have any attribute.
function empty_obj(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};

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

// Stat Class Methods
function Stat() {
    this._counter = 0;
    this._enable  = false;
};

Stat.prototype.enable = function() {
    this._enable = true;
};

Stat.prototype.disable = function() {
    this._enable = false;
};

Stat.prototype.isEnable = function() {
    return this._enable;
};

Stat.prototype.inc = function(amount) {
    this._counter += typeof amount !== 'undefined' ? amount : 1;
    return this._counter;
};

Stat.prototype.dec = function(amount) {
    this._counter -= typeof amount !== 'undefined' ? amount : 1;
    if(this._counter < 0) {
        this._counter = 0;
    }
    return this._counter;
};

Stat.prototype.get_counter = function() {
    return this._counter;
};

// DM_InstanceDep Class Methods
function DM_InstanceDep() {
    this.name     = null;
    this.attrs    = [];
    this.relation = DM_Relation.NONE;
};

DM_InstanceDep.prototype.create = function(name, attrs, relation) {
    this.name     = name;
    this.attrs    = attrs;
    this.relation = relation;
    return true;
}

// DM_Dep Class Methods
function DM_Dep() {
    this.name      = null;
    this.id        = null;
    this.prio      = null;
    this.deps      = {};
    this.callbacks = {};
};

DM_Dep.prototype.register = function(name, id, prio, deps, callbacks) {
    this.name      = name;
    this.id        = id;
    this.prio      = prio;
    this.deps      = deps;
    this.callbacks = callbacks;
    return true;
};

// DM_Instance Class Methods
function DM_Instance() {
    this.name    = null;
    this.state   = DM_InstanceState.NONE;
    this.deps    = null;
    this.in_deps = null;
};

DM_Instance.prototype.ID = 0;

DM_Instance.prototype.cleanID = function() {
    DM_Instance.prototype.ID = 0;
    return true;
};

DM_Instance.prototype.register = function(name) {
    this.name = name;
    this.state = DM_InstanceState.CREATED;
    DM_Instance.prototype.ID++;
    return true;
};

// DependencyManager Class Methods
// The First step for any instance is register to the dependency
// manager, so it will create a new DM_Instance for tracking
// purposes.
function DependencyManager() {
    this.deps = {};
};

DependencyManager.prototype.register = function(name) {
    if(this.deps.hasOwnProperty(name)) {
        return false;
    } else {
        var instance = new DM_Instance()
        this.deps[name] = instance.register(name);
        return true;
    }
};

