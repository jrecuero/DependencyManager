describe("Dependency Manager Dependency", function() {
    var dependency;

    beforeEach(function() {
        dependency = new DM_Dep();
    });

    afterEach(function() {
        dependency = null;
    });

    describe("New Dependency", function() {
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

    describe("Register/Unregister Dependency", function() {

        var reto;
        var name = "new dependency";
        var id   = "new id";
        var prio = 100;
        var deps = {one:1, two:2, three:3};
        var callbacks = {one: "one", two: "two", three: "three"};

        beforeEach(function() {
            reto = dependency.register(name, id, prio, deps, callbacks);
        })

        describe("Register Dependency", function() {
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

        describe("Unregister Dependency", function() {

            beforeEach(function() {
                reto = dependency.unregister();
            })

            it("Unregister call returns true", function() {
                expect(reto).toBe(true);
            });
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
    });
});

