const Visitor = t => ({
    VariableDeclaration(path) {
        const declarationsCount = path.node.declarations.length;
        const declaration = path.node.declarations[0];
        if (declarationsCount === 1 &&
            declaration.init &&
            t.isCallExpression(declaration.init.callee) &&
            declaration.init.callee.callee.name === 'compose' &&
            declaration.init.callee.arguments.length &&
            declaration.init.arguments.length === 1
        ) {
            const kind = path.node.kind;

            const enhancerList = declaration.init.callee.arguments.map(argument => argument.name).reverse();
            const exposedList = new Array(enhancerList.length - 1)
                .fill(0)
                .map(_ => path.scope.generateUidIdentifier("uid").name);
            const mixedList = new Array(enhancerList.length + exposedList.length)
                .fill(0)
                .map((_, ind) => (
                    ind % 2 === 0 ? enhancerList[Math.floor(ind / 2)] : exposedList[Math.floor((ind - 1) / 2)]
                ));

            const variableList = [declaration.init.arguments[0].name, ...mixedList, declaration.id.name];

            const variableDeclarations = new Array(enhancerList.length)
                .fill(0)
                .map((_, ind) => (
                    t.variableDeclaration(kind, [
                        t.variableDeclarator(
                            t.identifier(variableList[ind * 2 + 2]),
                            t.callExpression(
                                t.identifier(variableList[ind * 2 + 1]),
                                [t.identifier(variableList[ind * 2])]
                            )
                        )
                    ])
                ));

            path.replaceWithMultiple(variableDeclarations);
        }
    }
});

module.exports = ({types: t}) => ({
    visitor: {
        Program: {
            enter(path) {
                path.traverse(Visitor(t))
            }
        }
    }
});
