window.onload = function() {
    console.log("Dependency Manager");
}

function DependencyManager() {};

DependencyManager.prototype.init = function() {
    return 'init';
};

DependencyManager.prototype.start = function() {
    return 'start';
};

depMgr = new DependencyManager();
