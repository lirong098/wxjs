const behavior = require('../../my-behavior.js')
Component({
    relations: {
        '../test_b/test_b': {
            type: 'descendant'
        },
        '../test_c/test_c': {
            type: 'descendant'
        }
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
    },
    data: {
        // 这里是一些组件内部数据
        str: 'test_a'
    },
    methods: {
        // 这里是一个自定义方法
    }
})