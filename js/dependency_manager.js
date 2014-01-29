window.onload = function () {
    console.log("Dependency Manager");
};


/**
 * Class with API for Dependency Manager Module.
 *
 * @class DependencyManager
 * @constructor
 */
function DependencyManager() {
    /**
     * @property entities
     * @type Object
     */
    this.entities = {};

    /**
     * @property deps
     * @type Object
     */
    this.deps      = {};
}

/**
 * Register a new entity name to the Dependency Manager.
 *
 * @method register
 * @param {string} name entity name to be registered.
 * @return {boolean} true if entity was registered. false if entity name
 * was already registered.
 */
DependencyManager.prototype.register = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        return false;
    } else {
        this.entities[name] = new DM_Entity(name);
        return true;
    }
};

/**
 * Unregister an entity name from the Dependency Manager.
 *
 * @method unregister
 * @param {string} name entity name to be unregistered.
 * @return {boolean} true if entity was unregistered. false if entity
 * name was not found.
 */
DependencyManager.prototype.unregister = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        this.entities[name].unregister();
        delete this.entities[name];
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
 * @param {DM_Callback} callbacks
 * @return {boolean} true if dependency was added. false if entity name was
 * not found.
 */
DependencyManager.prototype.add_dep = function (name, id, prio, dep_list, callbacks) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];

        // Create a new dependency object with all information given.
        dep = new DM_Dep(name, id, prio, dep_list, callbacks);

        // For every dependency in the dep_list list, we have to add one entry for
        // every one of then in the in_deps array, so when changing state for
        // that entity we can find in all dependencies where it is being
        // included.
        if (entity.add_dep(id, dep)) {
            for (var i = 0; i < dep_list.length; i++) {
                dep_entity = this.entities[dep_list[i]];
                if (dep_entity) {
                    if (!dep_entity.add_in_dep(dep)) {
                        return false;
                    }
                }
            }
            return true;
        }
    }
    return false;
};

/**
 * Removes dependency for the given ID. It removes not only the dependency
 * in the entity object, but also that dependency in all IN dependency
 * for any other entities.
 *
 * @method remove_dep
 * @param {string} name
 * @param {string} dep_id
 * @return {boolean} true if dependency was removed. false if it was not found.
 */
DependencyManager.prototype.remove_dep = function (name, dep_id) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        if (entity.remove_dep(dep_id) != null) {
            for (var key in this.entities) {
                if (this.entities.hasOwnProperty(key)) {
                    this.entities[key].remove_in_dep(dep_id);
                }
            }
            return true;
        }
    }
    return false;
};

/**
 * @method notify_create
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_create = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_create();
    }
    return false;
};

/**
 * @method notify_partial
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_partial = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_partial();
    }
    return false;
};

/**
 * @method notify_active
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_active = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_active();
    }
    return false;
};

/**
 * @method notify_inactive
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_inactive = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_inactive();
    }
    return false;
};

/**
 * @method notify_delete
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_delete = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_delete();
    }
    return false;
};

/**
 * @method notify_destroy
 * @param {String} name
 * @return {Boolean} true if entity was found, false if not found.
 */
DependencyManager.prototype.notify_destroy = function (name) {
    if (this.entities.hasOwnProperty(name)) {
        entity = this.entities[name];
        entity.notify_destroy();
    }
    return false;
};

