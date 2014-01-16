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
     * @property instances
     * @type Object
     */
    this.instances = {};

    /**
     * @property deps
     * @type Object
     */
    this.deps      = {};
}

/**
 * Register a new instance name to the Dependency Manager.
 * 
 * @method register
 * @param {string} name Instance name to be registered.
 * @return {boolean} true if instance was registered. false if instance name
 * was already registered.
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
        // For every dependency in the deps list, we have to add one entry for
        // every one of then in the in_deps array, so when changing state for
        // that instance we can find in all dependencies where it is being
        // included.
        if (instance.add_dep(id, deps)) {
            for (var i = 0; i < deps.length; i++) {
                dep_instance = this.instances[deps[i]];
                if (dep_instance) {
                    if (!dep_instance.add_in_dep(id)) {
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
 * @method remove_dep
 * @param {string} name
 * @param {string} id
 * @return {boolean} true if dependency was removed. false if it was not found.
 */
DependencyManager.prototype.remove_dep = function (name, id) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        if (instance.remove_dep(id) != null) {
            for (var key in this.instances) {
                if (this.instances.hasOwnProperty(key)) {
                    this.instances[key].remove_in_dep(id);
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
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_create = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_create();
    }
    return false;
};

/**
 * @method notify_partial
 * @param {String} name
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_partial = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_partial();
    }
    return false;
};

/**
 * @method notify_active
 * @param {String} name
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_active = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_active();
    }
    return false;
};

/**
 * @method notify_inactive
 * @param {String} name
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_inactive = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_inactive();
    }
    return false;
};

/**
 * @method notify_delete
 * @param {String} name
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_delete = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_delete();
    }
    return false;
};

/**
 * @method notify_destroy
 * @param {String} name
 * @return {Boolean} true if instance was found, false if not found.
 */
DependencyManager.prototype.notify_destroy = function (name) {
    if (this.instances.hasOwnProperty(name)) {
        instance = this.instances[name];
        instance.notify_destroy();
    }
    return false;
};

