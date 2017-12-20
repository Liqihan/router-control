const PREFIX = "$$route_";

export function controller(pathName = "") {
    return function(target) {
        const proto = target.prototype;
        proto.$$path = Object.getOwnPropertyNames(proto)
            .filter(prop => prop.indexOf(PREFIX) === 0)
            .map(prop => {
                const { methodName, pathPattern } = proto[prop];
                const path = `${pathName}${pathPattern}`;
                // 对应的执行方法
                const executer = prop.substring(PREFIX.length);
                return {
                    methodName: methodName === "del" ? "delete" : methodName,
                    path,
                    executer
                };
            });
    };
}
export function route(methodName, pathPattern = "") {
    if (typeof methodName !== "string") {
        throw new Error("The first argument must be an HTTP method");
    }
    return function(target, name) {
        target[`${PREFIX}${name}`] = {
            methodName,
            pathPattern
        };
    };
}
const METHODS = [
    "head",
    "options",
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "del",
    "all"
];
METHODS.forEach(method => {
    exports[method] = route.bind(null, method);
});
