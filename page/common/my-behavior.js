module.exports = Behavior({
    methods: {
        // 获取父组件实例的快捷方法
        _parent(path = '../test_a/test_a') {
            // 如果根据该路径获取到acestor组件为null，则说明this为ancesor
            var parentNode = this.getRelationNodes(path)
            console.log('com', parentNode, path)
            // return parentNode
            if (parentNode && parentNode.length !== 0) {
                console.log('coms', parentNode[0])
                return parentNode[0]
            } else {
                return this
            }
        },
        // 获取兄弟组件实例的快捷方法
        _sibling(name) {
            var node = this._parent().getRelationNodes(name)
            console.log('com4', node)
            if (node && node.length > 0) {
                console.log('com5', node[0])
                return node[0]
            }
        }
    }
})
