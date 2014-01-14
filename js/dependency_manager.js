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

