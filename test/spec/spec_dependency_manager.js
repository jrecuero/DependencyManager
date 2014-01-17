describe("Dependency Manager", function() {

    var depMgr;

    beforeEach(function() {
        depMgr = new DependencyManager();
    });

    afterEach(function() {
        depMgr = null;
        DM_Entity.prototype.cleanID();
    })

    describe("New Entity", function() {
        it("Entities are empty", function() {
            expect(empty_obj(depMgr.entities)).toBe(true);
        });
        it("dependencies are empty", function() {
            expect(empty_obj(depMgr.deps)).toBe(true);
        });
    });

    describe("Operations with entities and dependencies", function() {

        var reto;
        var entity_name = "New Entity";

        beforeEach(function() {
            reto = depMgr.register(entity_name);
        });

        describe("Register/Unregister Entity", function() {
            it("Register a valid name", function() {
                expect(reto).toBe(true);
            });
            it("Entity are not more empty", function() {
                expect(empty_obj(depMgr.entities)).toBe(false);
                expect(DM_Entity.prototype.ID).toEqual(1);
                expect(DM_Entity.prototype.COUNTER).toEqual(1);
            });
            it("Register an existant name", function() {
                expect(depMgr.register(entity_name)).toBe(false);
                expect(DM_Entity.prototype.ID).toEqual(1);
                expect(DM_Entity.prototype.COUNTER).toEqual(1);
            });
        });

        describe("Unregister Entity", function() {
            it("Unregister returns True", function() {
                expect(depMgr.unregister(entity_name)).toBe(true);
                expect(DM_Entity.prototype.COUNTER).toEqual(0);
            });
            it("Unregister a not registered name returns false", function() {
                expect(depMgr.unregister("other name")).toBe(false);
                expect(DM_Entity.prototype.COUNTER).toEqual(1);
            })
        });

        describe("Handle Dependencies", function () {

            var id        = "new id";
            var prio      = 100;
            var deps      = [jasmine.createSpyObj('one', ['name', 'attrs', 'relation'])];
                             jasmine.createSpyObj('two', ['name', 'attrs', 'relation'])];
                             jasmine.createSpyObj('three', ['name', 'attrs', 'relation'])];
            var callbacks = null;

            beforeEach(function () {
                for (var i = 0; i < deps.length; i++) {
                    depMgr.register(deps[i].name);
                }
                callbacks = jasmine.createSpyObj('callbacks',
                    ['created', 'partial', 'active', 'inactive', 'deleted', 'destroyed']);
            });

            describe("Add Dependency", function() {
                it("Add new dependency", function () {
                    expect(depMgr.add_dep(entity_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.entities[entity_name].deps.hasOwnProperty(id)).toBe(true);
                    expect(callbacks.created).toHaveBeenCalled();
                    expect(callbacks.partial).not.toHaveBeenCalled();
                    expect(callbacks.active).not.toHaveBeenCalled();
                    expect(callbacks.inactive).not.toHaveBeenCalled();
                    expect(callbacks.deleted).not.toHaveBeenCalled();
                    expect(callbacks.destroyed).not.toHaveBeenCalled();
                    for (var i = 0; i < deps.length; i++) {
                        expect(depMgr.entities[deps[i].name].in_deps.length).toEqual(1);
                    }
                });
                it("Add same dependency fails", function () {
                    expect(depMgr.add_dep(entity_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.add_dep(entity_name, id, prio, deps, callbacks)).toBe(false);
                    expect(depMgr.entities[entity_name].deps.hasOwnProperty(id)).toBe(true);
                });
            });

            describe("Remove Dependency", function () {
                it("Remove existing dependency", function () {
                    expect(depMgr.add_dep(entity_name, id, prio, deps, callbacks)).toBe(true);
                    expect(depMgr.remove_dep(entity_name, id)).toBe(true);
                });
                it("Remove none-existing dependency", function () {
                    expect(depMgr.remove_dep(entity_name, id)).toBe(false);
                });
            });
        });
    });
});

