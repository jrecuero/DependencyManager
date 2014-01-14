describe("Dependency Manager Instance", function () {

    var instance;

    beforeEach(function () {
        instance = new DM_Instance();
    });

    afterEach(function () {
        instance.cleanID();
        instance = null;
    })

    describe("New instance", function () {
        it("name is null", function () {
            expect(instance.name).toBe(null);
        });
        it("state is NONE", function () {
            expect(instance.state).toBe(DM_InstanceState.NONE);
        });
        it("dependencies are null", function () {
            expect(instance.deps).toBe(null);
        });
        it("in dependencies are null", function () {
            expect(instance.in_deps).toBe(null);
        });
        it("ID is 0", function () {
            expect(instance.ID).toEqual(0);
        });
        it("COUNTER is 0", function () {
            expect(instance.COUNTER).toEqual(0);
        });
    });

    describe("Reset Counters", function () {
        it("ID and COUNTER are reseted to 0", function () {
            expect(instance.cleanID()).toBe(true);
            expect(instance.ID).toEqual(0);
            expect(instance.COUNTER).toEqual(0);
        });
    });

    describe("Instance operations", function () {

        var reto; 
        var id   = "tracID";
        var deps = [1, 2, 3];

        beforeEach(function () {
            reto = instance.register('tracing');
        });

        describe("Register instance", function () {
            it("instance name: 'tracing', state: CREATED, ID: 1", function () {
                expect(reto).toBe(true);
                expect(instance.name).toEqual('tracing');
                expect(instance.state).toEqual(DM_InstanceState.CREATED);
                expect(empty_obj(instance.deps)).toBe(true)
                expect(instance.in_deps.length).toEqual(0);
                expect(instance.ID).toEqual(1);
                expect(instance.COUNTER).toEqual(1);
            })
        });

        describe("Unregister instance", function () {
            it("instance after unregister is all null", function () {
                expect(instance.unregister()).toBe(true);
                expect(instance.name).toBe(null);
                expect(instance.state).toBe(DM_InstanceState.NONE);
                expect(instance.deps).toBe(null);
                expect(instance.in_deps).toBe(null);
                expect(instance.ID).toEqual(1);
                expect(instance.COUNTER).toEqual(0);
            });
        });

        describe("Add Dependency", function () {
            it("Add new dependency", function () {
                expect(instance.add_dep(id, deps)).toBe(true);
                expect(instance.deps.hasOwnProperty(id)).toBe(true);
                expect(instance.deps[id]).toEqual(deps);
            });
            it("Add same dependency fails", function () {
                expect(instance.add_dep(id, deps)).toBe(true);
                expect(instance.add_dep(id, deps)).toBe(false);
                expect(instance.deps.hasOwnProperty(id)).toBe(true);
                expect(instance.deps[id]).toEqual(deps);
            });
        });

        describe("Remove Dependency", function () {
            it("Remove existing dependency", function () {
                expect(instance.add_dep(id, deps)).toBe(true);
                expect(instance.remove_dep(id)).toEqual(deps);
                expect(instance.deps.hasOwnProperty(id)).toBe(false);
            });
            it("Remove none-existing dependency", function () {
                expect(instance.remove_dep(id)).toBe(null);
            });
        });
    });
});

