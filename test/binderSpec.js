var expect = require("chai").expect,
    Binder = require("../lib/binder"),
    binder;

describe("Binder", function(){

    beforeEach(function() {
        binder = new Binder();
    });

    describe("#root", function(){
        it("should have a default _string value of ''", function(){
            expect(binder).to.have.a.property("_string", '');
        });

        it("should have a default _bindings value of []", function(){
            expect(binder).to.have.a.property("_bindings");

            expect(binder._bindings).to.eql([]);
        });
    });

    describe("#prepare", function(){
        it("should replace all instances of ? with bindings at the same index", function(){
            expect(binder.prepare('Some string with ? here and ? made.', ['[replacement]', '[there]'])).to.equal('Some string with \'[replacement]\' here and \'[there]\' made.');
        });

        it("should replace all instances of ?? with bindings at the same index escaped as id", function(){
            expect(binder.prepare('Some string with ?? here and ?? made.', ['[replacement]', '[there]'])).to.equal('Some string with \`[replacement]\` here and \`[there]\` made.');
        });
    });

});