/**
 * Class methods required for handling individual entities registered
 * to the Dependency Manager.
 *
 * One entity is an entry that Depedency Manager will be used as a
 * dependency or to contain dependencies.
 *
 * @class DM_Entity
 * @constructor
 * @param {string} name entity name to be used.
 */
function DM_Entity(name) {
    /**
     * Entity name.
     *
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * Entity State.
     *
     * @property state
     * @type DM_EntityState
     */
    this.state   = DM_EntityState.CREATED;

    /**
     * Entity dependencies. Dependencies are stored in a object like, where
     * attribute name is the dependency id and value is the DM_Dep instance.
     *
     * @property deps
     * @type Object
     */
    this.deps = {};

    /**
     * Other Entities that have this instance as a dependency. In Dependency is
     * stored in a object like, where attribute nams is the dependency id where
     * this instance is a dependency and value is the DM_Dep instance.
     * @property in_deps
     * @type Object
     */
    this.in_deps = {};

    DM_Entity.prototype.ID++;
    DM_Entity.prototype.COUNTER++;
}

/**
 * Initialize DM_Entity class variables.
 *
 * @method init
 * @static
 */
DM_Entity.prototype.init = function () {
    /**
     * This is a unique ID for every entity created.
     *
     * @propety ID
     * @static
     * @type {Int}
     */
    DM_Entity.prototype.ID      = 0;

    /**
     * This is a counter with the number of entities that are created at one
     * point.
     *
     * @property COUNTER
     * @static
     * @type {Int}
     */
    DM_Entity.prototype.COUNTER = 0;
    return true;
};

/**
 * Reset ID and COUNTER class attributes.
 *
 * @method cleanID
 * @return {boolean} true
 */
DM_Entity.prototype.cleanID = function () {
    return DM_Entity.prototype.init();
};

/**
 * Check if DM_Dep has a callback for the given state and call that method if
 * it exists.
 *
 * @method _cb_for_state
 * @private
 * @param {DM_Dep} dep
 * @param {DM_EntityState} state
 * @return {Object}
 */
DM_Entity.prototype._cb_for_state = function (dep, state) {
    if (dep.callbacks[state] != null) {
        return dep.callbacks[state](this.name);
    }
    return null;
};

/**
 * @method _check_dependencies_for_state
 * @param {DM_EntityState} state
 */
DM_Entity.prototype._check_dependencies_for_state = function (state) {
    for (var dep_id in this.in_deps) {
        var state_match = true;
        dep = this.in_deps[dep_id];
        for (var i = 0; i < dep.deps.length; i++) {
            if (dep.deps[i].state != state) {
                state_match = false;
                break;
            }
        }
        if (state_match == true) {
            this._cb_for_state(dep, state);
        }
    }
};

/**
 * @method add_dep
 * @param {string} id
 * @param {DM_Dep} dep Dependencies.
 * @return {boolean} true
 */
DM_Entity.prototype.add_dep = function (id, dep) {
    if (!this.deps.hasOwnProperty(id)) {
        this.deps[id] = dep;
        this._cb_for_state(dep, this.state);
        return true;
    }
    return false
};

/**
 * @method remove_dep
 * @param {string} dep_id
 * @return {DM_Dep} null if not found.
 */
DM_Entity.prototype.remove_dep = function (dep_id) {
    if (this.deps.hasOwnProperty(dep_id)) {
        deps = this.deps[dep_id];
        delete this.deps[dep_id];
        return deps;
    }
    return null;
};

/**
 * @method add_in_dep
 * @param {DM_Dep} in_dep
 * @return {Boolean}
 */
DM_Entity.prototype.add_in_dep = function (in_dep) {
    in_dep_id = in_dep.id;
    if (!this.in_deps.hasOwnProperty(in_dep_id)) {
        this.in_deps[in_dep_id] = in_dep;
        return true;
    }
    return false;
};

/**
 * @method remove_in_dep
 * @param {String} in_dep_id
 * @return {Boolean}
 */
DM_Entity.prototype.remove_in_dep = function (in_dep_id) {
    if (this.in_deps.hasOwnProperty(in_dep_id)) {
        in_dep = this.in_deps[in_dep_id];
        delete this.in_deps[in_dep_id];
        return in_dep;
    }
    return null;
};

/**
 * @method notify_create
 * @return {DM_EntityState} DM_EntityState.CREATED
 */
DM_Entity.prototype.notify_create = function (name) {
    this.state = DM_EntityState.CREATED;
    //this._cb_for_state(this.state);
    return this.state;
};

/**
 * @method notify_partial
 * @return {DM_EntityState} DM_EntityState.PARTIAL
 */
DM_Entity.prototype.notify_partial = function (name) {
    this.state = DM_EntityState.PARTIAL;
    //this._cb_for_state(this.state);
    return this.state;
};

/**
 * @method notify_active
 * @return {DM_EntityState} DM_EntityState.ACTIVE
 */
DM_Entity.prototype.notify_active = function (name) {
    this.state = DM_EntityState.ACTIVE;
    //this._cb_for_state(this.state);
    return this.state;
};

/**
 * @method notify_inactive
 * @return {DM_EntityState} DM_EntityState.INACTIVE
 */
DM_Entity.prototype.notify_inactive = function (name) {
    this.state = DM_EntityState.INACTIVE;
    //this._cb_for_state(this.state);
    return this.state;
};

/**
 * @method notify_delete
 * @return {DM_EntityState} DM_EntityState.DELETED
 */
DM_Entity.prototype.notify_delete = function (name) {
    this.state = DM_EntityState.DELETED;
    //this._cb_for_state(this.state);
    return this.state;
};

/**
 * @method notify_destroy
 * @return {DM_EntityState} DM_EntityState.DESTROYED
 */
DM_Entity.prototype.notify_destroy = function (name) {
    this.state = DM_EntityState.DESTROYED;
    //this._cb_for_state(this.state);
    return this.state;
};

DM_Entity.prototype.init();

