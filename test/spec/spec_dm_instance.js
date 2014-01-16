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
        var id      = "tracID";
        var deps    = [1, 2, 3];
        var in_deps = [10, 11, 12];

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

        describe("Add IN Dependency", function() {
            it("Add new IN dependency", function() {
                expect(instance.add_in_dep(in_deps[0])).toBe(true);
                expect(instance.add_in_dep(in_deps[1])).toBe(true);
                expect(instance.add_in_dep(in_deps[2])).toBe(true);
                expect(instance.in_deps.length).toEqual(3);
                expect(instance.in_deps[0]).toEqual(in_deps[0]);
                expect(instance.in_deps[1]).toEqual(in_deps[1]);
                expect(instance.in_deps[2]).toEqual(in_deps[2]);
            });
            it("Add already added IN dependency", function() {
                expect(instance.add_in_dep(in_deps[0])).toBe(true);
                expect(instance.add_in_dep(in_deps[0])).toBe(false);
                expect(instance.in_deps.length).toEqual(1);
            });
        });

        describe("Remove IN Dependency", function() {
            it("Remove existing IN dependency", function() {
                expect(instance.add_in_dep(in_deps[0])).toBe(true);
                expect(instance.add_in_dep(in_deps[1])).toBe(true);
                expect(instance.add_in_dep(in_deps[2])).toBe(true);
                expect(instance.remove_in_dep(in_deps[0])).toBe(true);
                expect(instance.in_deps.indexOf(in_deps[0])).toEqual(-1);
                expect(instance.in_deps.length).toEqual(2);
                expect(instance.remove_in_dep(in_deps[1])).toBe(true);
                expect(instance.in_deps.indexOf(in_deps[1])).toEqual(-1);
                expect(instance.in_deps.length).toEqual(1);
                expect(instance.remove_in_dep(in_deps[2])).toBe(true);
                expect(instance.in_deps.indexOf(in_deps[2])).toEqual(-1);
                expect(instance.in_deps.length).toEqual(0);
            });
            it("Remove NOT existing IN dependency", function () {
                expect(instance.add_in_dep(in_deps[0])).toBe(true);
                expect(instance.remove_in_dep(in_deps[2])).toBe(false);
                expect(instance.in_deps.indexOf(in_deps[0])).toEqual(0);
                expect(instance.in_deps.length).toEqual(1);
            });
        });

        describe("Notify change state", function () {
            it("Notify Create change state to CREATED", function () {
                expect(instance.notify_create()).toEqual(DM_InstanceState.CREATED);
                expect(instance.state).toEqual(DM_InstanceState.CREATED);
            });
            it("Notify Partial change state to PARTIAL", function () {
                expect(instance.notify_partial()).toEqual(DM_InstanceState.PARTIAL);
                expect(instance.state).toEqual(DM_InstanceState.PARTIAL);
            });
            it("Notify Active change state to ACTIVE", function () {
                expect(instance.notify_active()).toEqual(DM_InstanceState.ACTIVE);
                expect(instance.state).toEqual(DM_InstanceState.ACTIVE);
            });
            it("Notify Inactive change state to INACTIVE", function () {
                expect(instance.notify_inactive()).toEqual(DM_InstanceState.INACTIVE);
                expect(instance.state).toEqual(DM_InstanceState.INACTIVE);
            });
            it("Notify Delete change state to DELETED", function () {
                expect(instance.notify_delete()).toEqual(DM_InstanceState.DELETED);
                expect(instance.state).toEqual(DM_InstanceState.DELETED);
            });
            it("Notify Destroy change state to DESTROYED", function () {
                expect(instance.notify_destroy()).toEqual(DM_InstanceState.DESTROYED);
                expect(instance.state).toEqual(DM_InstanceState.DESTROYED);
            });
        });
    });
});

