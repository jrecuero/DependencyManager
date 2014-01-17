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
     * @property name
     * @type String
     */
    this.name = name;

    /**
     * @property state
     * @type DM_EntityState
     */
    this.state   = DM_EntityState.CREATED;

    /**
     * @property deps
     * @type Object
     */
    this.deps    = {};

    /**
     * @property in_deps
     * @type Object
     */
    this.in_deps = [];

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
    DM_Entity.prototype.ID      = 0;
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

DM_Entity.prototype._cb_for_state = function (deps, state) {
    if (deps.callbacks[state] != null) {
        return deps.callbacks[state](this.name);
    }
    return null;
};

/**
 * @method add_dep
 * @param {string} id
 * @param {DM_Dep} deps Dependencies.
 * @return {boolean} true
 */
DM_Entity.prototype.add_dep = function (id, deps) {
    if (!this.deps.hasOwnProperty(id)) {
        this.deps[id] = deps;
        this._cb_for_state(deps, this.state);
        return true;
    }
    return false
};

/**
 * @method remove_dep
 * @param {string} id
 * @return {DM_Dep} null if not found.
 */
DM_Entity.prototype.remove_dep = function (id) {
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
DM_Entity.prototype.add_in_dep = function (in_dep_id) {
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
DM_Entity.prototype.remove_in_dep = function (in_dep_id) {
    index = this.in_deps.indexOf(in_dep_id);
    if (index != -1) {
        this.in_deps.splice(index, 1);
        return true;
    }
    return false;
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

