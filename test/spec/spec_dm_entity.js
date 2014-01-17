describe("Dependency Manager Entity", function () {

    var entity;

    beforeEach(function () {
        entity = new DM_Entity();
    });

    afterEach(function () {
        entity.cleanID();
        entity = null;
    })

    describe("New entity", function () {
        it("name is null", function () {
            expect(entity.name).toBe(null);
        });
        it("state is NONE", function () {
            expect(entity.state).toBe(DM_EntityState.NONE);
        });
        it("dependencies are null", function () {
            expect(entity.deps).toBe(null);
        });
        it("in dependencies are null", function () {
            expect(entity.in_deps).toBe(null);
        });
        it("ID is 0", function () {
            expect(entity.ID).toEqual(0);
        });
        it("COUNTER is 0", function () {
            expect(entity.COUNTER).toEqual(0);
        });
    });

    describe("Reset Counters", function () {
        it("ID and COUNTER are reseted to 0", function () {
            expect(entity.cleanID()).toBe(true);
            expect(entity.ID).toEqual(0);
            expect(entity.COUNTER).toEqual(0);
        });
    });

    describe("Entity operations", function () {

        var reto;
        var id      = "tracID";
        var deps    = null;
        var in_deps = ['One', 'Two', 'Three'];

        beforeEach(function () {
            reto = entity.register('tracing');
            deps = jasmine.createSpyObj('deps', ['callbacks', 'name']);
            deps.callbacks = jasmine.createSpyObj('callbacks',
                    ['created', 'partial', 'active', 'inactive', 'deleted', 'destroyed']);
        });

        describe("Register entity", function () {
            it("Entity name: 'tracing', state: CREATED, ID: 1", function () {
                expect(reto).toBe(true);
                expect(entity.name).toEqual('tracing');
                expect(entity.state).toEqual(DM_EntityState.CREATED);
                expect(empty_obj(entity.deps)).toBe(true)
                expect(entity.in_deps.length).toEqual(0);
                expect(entity.ID).toEqual(1);
                expect(entity.COUNTER).toEqual(1);
            })
        });

        describe("Unregister entity", function () {
            it("Entity after unregister is all null", function () {
                expect(entity.unregister()).toBe(true);
                expect(entity.name).toBe(null);
                expect(entity.state).toBe(DM_EntityState.NONE);
                expect(entity.deps).toBe(null);
                expect(entity.in_deps).toBe(null);
                expect(entity.ID).toEqual(1);
                expect(entity.COUNTER).toEqual(0);
            });
        });

        describe("Add Dependency", function () {
            it("Add new dependency", function () {
                expect(entity.add_dep(id, deps)).toBe(true);
                expect(entity.deps.hasOwnProperty(id)).toBe(true);
                expect(entity.deps[id]).toEqual(deps);
                expect(deps.callbacks.created).toHaveBeenCalled();
                expect(deps.callbacks.partial).not.toHaveBeenCalled();
                expect(deps.callbacks.active).not.toHaveBeenCalled();
                expect(deps.callbacks.inactive).not.toHaveBeenCalled();
                expect(deps.callbacks.deleted).not.toHaveBeenCalled();
                expect(deps.callbacks.destroyed).not.toHaveBeenCalled();
            });
            it("Add same dependency fails", function () {
                expect(entity.add_dep(id, deps)).toBe(true);
                expect(entity.add_dep(id, deps)).toBe(false);
                expect(entity.deps.hasOwnProperty(id)).toBe(true);
                expect(entity.deps[id]).toEqual(deps);
            });
        });

        describe("Remove Dependency", function () {
            it("Remove existing dependency", function () {
                expect(entity.add_dep(id, deps)).toBe(true);
                expect(entity.remove_dep(id)).toEqual(deps);
                expect(entity.deps.hasOwnProperty(id)).toBe(false);
            });
            it("Remove none-existing dependency", function () {
                expect(entity.remove_dep(id)).toBe(null);
            });
        });

        describe("Add IN Dependency", function() {
            it("Add new IN dependency", function() {
                expect(entity.add_in_dep(in_deps[0])).toBe(true);
                expect(entity.add_in_dep(in_deps[1])).toBe(true);
                expect(entity.add_in_dep(in_deps[2])).toBe(true);
                expect(entity.in_deps.length).toEqual(3);
                expect(entity.in_deps[0]).toEqual(in_deps[0]);
                expect(entity.in_deps[1]).toEqual(in_deps[1]);
                expect(entity.in_deps[2]).toEqual(in_deps[2]);
            });
            it("Add already added IN dependency", function() {
                expect(entity.add_in_dep(in_deps[0])).toBe(true);
                expect(entity.add_in_dep(in_deps[0])).toBe(false);
                expect(entity.in_deps.length).toEqual(1);
            });
        });

        describe("Remove IN Dependency", function() {
            it("Remove existing IN dependency", function() {
                expect(entity.add_in_dep(in_deps[0])).toBe(true);
                expect(entity.add_in_dep(in_deps[1])).toBe(true);
                expect(entity.add_in_dep(in_deps[2])).toBe(true);
                expect(entity.remove_in_dep(in_deps[0])).toBe(true);
                expect(entity.in_deps.indexOf(in_deps[0])).toEqual(-1);
                expect(entity.in_deps.length).toEqual(2);
                expect(entity.remove_in_dep(in_deps[1])).toBe(true);
                expect(entity.in_deps.indexOf(in_deps[1])).toEqual(-1);
                expect(entity.in_deps.length).toEqual(1);
                expect(entity.remove_in_dep(in_deps[2])).toBe(true);
                expect(entity.in_deps.indexOf(in_deps[2])).toEqual(-1);
                expect(entity.in_deps.length).toEqual(0);
            });
            it("Remove NOT existing IN dependency", function () {
                expect(entity.add_in_dep(in_deps[0])).toBe(true);
                expect(entity.remove_in_dep(in_deps[2])).toBe(false);
                expect(entity.in_deps.indexOf(in_deps[0])).toEqual(0);
                expect(entity.in_deps.length).toEqual(1);
            });
        });

        describe("Notify change state", function () {
            it("Notify Create change state to CREATED", function () {
                expect(entity.notify_create()).toEqual(DM_EntityState.CREATED);
                expect(entity.state).toEqual(DM_EntityState.CREATED);
            });
            it("Notify Partial change state to PARTIAL", function () {
                expect(entity.notify_partial()).toEqual(DM_EntityState.PARTIAL);
                expect(entity.state).toEqual(DM_EntityState.PARTIAL);
            });
            it("Notify Active change state to ACTIVE", function () {
                expect(entity.notify_active()).toEqual(DM_EntityState.ACTIVE);
                expect(entity.state).toEqual(DM_EntityState.ACTIVE);
            });
            it("Notify Inactive change state to INACTIVE", function () {
                expect(entity.notify_inactive()).toEqual(DM_EntityState.INACTIVE);
                expect(entity.state).toEqual(DM_EntityState.INACTIVE);
            });
            it("Notify Delete change state to DELETED", function () {
                expect(entity.notify_delete()).toEqual(DM_EntityState.DELETED);
                expect(entity.state).toEqual(DM_EntityState.DELETED);
            });
            it("Notify Destroy change state to DESTROYED", function () {
                expect(entity.notify_destroy()).toEqual(DM_EntityState.DESTROYED);
                expect(entity.state).toEqual(DM_EntityState.DESTROYED);
            });
        });
    });
});

