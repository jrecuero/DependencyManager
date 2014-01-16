describe("Dependency Manager", function() {

    var depMgr;

    beforeEach(function() {
        depMgr = new DependencyManager();
    });

    afterEach(function() {
        depMgr = null;
        DM_Instance.prototype.cleanID();
    })

    describe("New Instance", function() {
        it("instances are empty", function() {
            expect(empty_obj(depMgr.instances)).toBe(true);
        });
        it("dependencies are empty", function() {
            expect(empty_obj(depMgr.deps)).toBe(true);
        });
    });

    describe("Operations with instances and dependencies", function() {

        var reto;
        var inst_name = "New Instance";

        beforeEach(function() {
            reto = depMgr.register(inst_name);
        });

        describe("Register/Unregister Instance", function() {
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
            it("Unregister returns True", function() {
                expect(depMgr.unregister(inst_name)).toBe(true);
                expect(DM_Instance.prototype.COUNTER).toEqual(0);
            });
            it("Unregister a not registered name returns false", function() {
                expect(depMgr.unregister("other name")).toBe(false);
                expect(DM_Instance.prototype.COUNTER).toEqual(1);
            })
        });

        describe("Handle Dependencies", function () {

            var id        = "new id";
            var prio      = 100;
            var deps      = ['One', 'Two', 'Three'];
            var callbacks = {one: "one", two: "two", three: "three"};

            beforeEach(function () {
                for (var i = 0; i < deps.length; i++) {
                    depMgr.register(deps[i]);
                }
            });

            describe("Add Dependency", function() {
                it("Add new dependency", function () {
                    expect(depMgr.add_dep(inst_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.instances[inst_name].deps.hasOwnProperty(id)).toBe(true);
                    for (var i = 0; i < deps.length; i++) {
                        expect(depMgr.instances[deps[i]].in_deps.length).toEqual(1);
                    }
                });
                it("Add same dependency fails", function () {
                    expect(depMgr.add_dep(inst_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.add_dep(inst_name, id, prio, deps, callbacks)).toBe(false);
                    expect(depMgr.instances[inst_name].deps.hasOwnProperty(id)).toBe(true);
                });
            });

            describe("Remove Dependency", function () {
                it("Remove existing dependency", function () {
                    expect(depMgr.add_dep(inst_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.remove_dep(inst_name, id)).toBe(true);
                });
                it("Remove none-existing dependency", function () {
                    expect(depMgr.remove_dep(inst_name, id)).toBe(false);
                });
            });
        });
    });
});

