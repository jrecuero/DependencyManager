describe("Dependency Manager Dependency", function() {

    var dependency;
    var name = "new dependency";
    var id   = "new id";
    var prio = 100;
    var deps = {one:1, two:2, three:3};
    var callbacks = {one: "one", two: "two", three: "three"};

    beforeEach(function() {
        dependency = new DM_Dep(name, id, prio, deps, callbacks);
    });

    afterEach(function() {
        dependency = null;
    });

    describe("Create Dependency", function() {
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

