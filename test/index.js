import * as Router from "../src/index";
import { assert } from "chai";
function m1() {}

describe("control", () => {
    const { controller, route, get, post, all, del } = Router;
    it("should add $$path", () => {
        @controller()
        class Ctrl {}
        assert.deepEqual(new Ctrl().$$path, []);
    });
    it("should define correct $routes", () => {
        @controller()
        class Ctrl {
            @all()
            _all() {}
        }

        assert.deepEqual(new Ctrl().$$path, [
            { methodName: "all", path: "", executer: "_all" }
        ]);
    });
    it("should define correct $routes when paths are specified", () => {
        @controller("/prefix")
        class Ctrl {
            @all("/all")
            _all() {}
        }

        assert.deepEqual(new Ctrl().$$path, [
            { methodName: "all", path: "/prefix/all", executer: "_all" }
        ]);
    });
    it("should define correct $routes when use route", () => {
        @controller("/prefix")
        class Ctrl {
            @route("get", "/all")
            _get() {}
        }

        assert.deepEqual(new Ctrl().$$path, [
            { methodName: "get", path: "/prefix/all", executer: "_get" }
        ]);
    });
    it("should normalize `del` to `delete`", () => {
        @controller()
        class Ctrl {
            @route("del", "/delete1")
            _delete1() {}
            @del("/delete2")
            _delete2() {}
            @route("delete", "/delete3")
            _delete3() {}
        }

        assert.deepEqual(new Ctrl().$$path, [
            { methodName: "delete", path: "/delete1", executer: "_delete1" },
            { methodName: "delete", path: "/delete2", executer: "_delete2" },
            { methodName: "delete", path: "/delete3", executer: "_delete3" }
        ]);
    });
});
