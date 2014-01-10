describe("Stat", function() {
    var stat;

    beforeEach(function() {
        stat = new Stat();
    });

    afterEach(function() {
        stat = null;
    });

    it("new stat has counter to zero", function() {
        expect(stat.counter).toEqual(0);
    });
    it("new stat is disabled", function() {
        expect(stat.enabled).toBe(false);
    });
    it("enable stat set enable to true", function() {
        stat.enable();
        expect(stat.enabled).toBe(true);
    })
    it("disable stat set enable to false", function() {
        stat.enable();
        expect(stat.enabled).toBe(true);
        stat.disable();
        expect(stat.enabled).toBe(false);
    });
    it("isEnable return if enable is true", function() {
        expect(stat.isEnable()).toBe(false);
        stat.enable();
        expect(stat.isEnable()).toBe(true);
    });
    it("getCounter returns counter value", function() {
        expect(stat.get_counter()).toEqual(0);
        stat.counter = 10;
        expect(stat.get_counter()).toEqual(10);
    });
    it("inc method increase counter value by amount (default is 1)", function() {
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.inc(10)).toEqual(11);
        expect(stat.get_counter()).toEqual(11);
    });
    it("dec method decrease counter.", function() {
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.dec()).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc(10)).toEqual(10);
        expect(stat.get_counter()).toEqual(10);
        expect(stat.dec()).toEqual(9);
        expect(stat.get_counter()).toEqual(9);
        expect(stat.dec(5)).toEqual(4);
        expect(stat.get_counter()).toEqual(4);
        expect(stat.dec(4)).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
    });
    it("dec can not decrease under zero", function() {
        expect(stat.dec()).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
        expect(stat.inc()).toEqual(1);
        expect(stat.get_counter()).toEqual(1);
        expect(stat.dec(10)).toEqual(0);
        expect(stat.get_counter()).toEqual(0);
    });
});

describe("Dependency Manager Dependecy Instance", function() {
    var instance;

    beforeEach(function() {
        instance = new DM_InstanceDep();
    });

    afterEach(function() {
        instance = null;
    });

    describe("New Instance", function() {
        it("name is null", function() {
            expect(instance.name).toBe(null);
        });
        it("attrs is empty", function() {
            expect(instance.attrs.length).toBe(0);
        });
        it("relation is NONE", function() {
            expect(instance.relation).toEqual(DM_Relation.NONE);
        });
    });

    describe("Create New Instance Dependency", function() {

        var reto;
        var name     = "new instance dependency";
        var attrs    = [1, 2, 3];
        var relation = DM_Relation.MAIN;

        beforeEach(function() {
            reto = instance.create(name, attrs, relation);
        });

        it("Register call returns true", function() {
            expect(reto).toBe(true);
        });
        it("name is 'new instance dependency'", function() {
            expect(instance.name).toEqual(name);
        });
        it("attrs is [1, 2, 3]", function() {
            expect(instance.attrs).toEqual(attrs);
        });
        it("relation is MAIN", function() {
            expect(instance.relation).toEqual(DM_Relation.MAIN);
        });
    });
});

describe("Dependency Manager Dependency", function() {
    var dependency;

    beforeEach(function() {
        dependency = new DM_Dep();
    });

    afterEach(function() {
        dependency = null;
    });

    describe("Create New Dependency", function() {
        it("name is null", function() {
            expect(dependency.name).toBe(null);
        });
        it("id is null", function() {
            expect(dependency.id).toBe(null);
        });
        it("prio is null", function() {
            expect(dependency.prio).toBe(null);
        });
        it("deps to be empty", function() {
            expect(empty_obj(dependency.deps)).toBe(true);
        });
        it("callbacks to be empty", function() {
            expect(empty_obj(dependency.callbacks)).toBe(true);
        });
    });

    describe("Register Dependency", function() {

        var reto;
        var name = "new dependency";
        var id   = "new id";
        var prio = 100;
        var deps = {one:1, two:2, three:3};
        var callbacks = {one: "one", two: "two", three: "three"};

        beforeEach(function() {
            reto = dependency.register(name, id, prio, deps, callbacks);
        })

        it("Register call returns true", function() {
            expect(reto).toBe(true);
        });
        it("name is 'new dependency'", function() {
            expect(dependency.name).toEqual(name);
        });
        it("id is 'new id'", function() {
            expect(dependency.id).toEqual(id);
        });
        it("prio is 100", function() {
            expect(dependency.prio).toEqual(100);
        });
        it("deps to be {one:1, two:2, three:3}", function() {
            expect(dependency.deps).toEqual(deps);
        });
        it("callbacks to be {one:'one', two:'two', three:'three'}", function() {
            expect(dependency.callbacks).toEqual(callbacks);
        });
    });
});

describe("Dependency Manager Instance", function() {

    var instance;

    beforeEach(function() {
        instance = new DM_Instance();
    });

    afterEach(function() {
        instance.cleanID();
        instance = null;
    })

    describe("Create New instance", function() {
        it("name is null", function() {
            expect(instance.name).toBe(null);
        });
        it("state is NONE", function() {
            expect(instance.state).toBe(DM_InstanceState.NONE);
        });
        it("dependencies are null", function() {
            expect(instance.deps).toBe(null);
        });
        it("in dependencies are null", function() {
            expect(instance.in_deps).toBe(null);
        });
        it("ID is 0", function() {
            expect(instance.ID).toEqual(0);
        });
        it("COUNTER is 0", function() {
            expect(instance.COUNTER).toEqual(0);
        });
    });

    describe("Register instance", function() {

        var reto; 

        beforeEach(function() {
            reto = instance.register('tracing');
        });

        it("instance name: 'tracing', state: CREATED, ID: 1", function() {
            expect(reto).toBe(true);
            expect(instance.name).toEqual('tracing');
            expect(instance.state).toEqual(DM_InstanceState.CREATED);
            expect(empty_obj(instance.deps)).toBe(true)
            expect(instance.in_deps.length).toEqual(0);
            expect(instance.ID).toEqual(1);
            expect(instance.COUNTER).toEqual(1);
        })
    });

    describe("Unregister instance", function() {

        beforeEach(function() {
            reto = instance.register('tracing');
        });

        it("instance after unregister is all null", function() {
            expect(instance.unregister()).toBe(true);
            expect(instance.name).toBe(null);
            expect(instance.state).toBe(DM_InstanceState.NONE);
            expect(instance.deps).toBe(null);
            expect(instance.in_deps).toBe(null);
            expect(instance.ID).toEqual(1);
            expect(instance.COUNTER).toEqual(0);
        });
    });

    describe("Reset Counters", function() {
        it("ID and COUNTER are reseted to 0", function() {
            expect(instance.cleanID()).toBe(true);
            expect(instance.ID).toEqual(0);
            expect(instance.COUNTER).toEqual(0);
        });
    });
});

describe("Dependency Manager", function() {

    var depMgr;

    beforeEach(function() {
        depMgr = new DependencyManager();
    });

    afterEach(function() {
        depMgr = null;
        DM_Instance.prototype.cleanID();
    })

    describe("Create New", function() {
        it("instances are empty", function() {
            expect(empty_obj(depMgr.instances)).toBe(true);
        });
        it("dependencies are empty", function() {
            expect(empty_obj(depMgr.deps)).toBe(true);
        });
    });

    describe("Register Instance", function() {

        var reto;
        var inst_name = "New Instance";

        beforeEach(function() {
            reto = depMgr.register(inst_name);
        });

        it("Register a valid name", function() {
            expect(reto).toBe(true);
        });

        it("Instances are not more empty", function() {
            expect(empty_obj(depMgr.instances)).toBe(false);
            expect(DM_Instance.prototype.ID).toEqual(1);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        });

        it("Register an existant name", function() {
            expect(depMgr.register(inst_name)).toBe(false);
            expect(DM_Instance.prototype.ID).toEqual(1);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        });
    });

    describe("Unregister Instance", function() {

        var inst_name = "New Instance";

        beforeEach(function() {
            depMgr.register(inst_name);
        });

        it("Unregister returns True", function() {
            expect(depMgr.unregister(inst_name)).toBe(true);
            expect(DM_Instance.prototype.COUNTER).toEqual(0);
        });
        it("Unregister a not registered name returns false", function() {
            expect(depMgr.unregister("other name")).toBe(false);
            expect(DM_Instance.prototype.COUNTER).toEqual(1);
        })
    });
});

