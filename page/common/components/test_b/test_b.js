const behavior = require('../../my-behavior.js')
Component({
    behaviors: [behavior],
    relations: {
        '../test_a/test_a': {
            type: 'ancestor'
        }
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
    },
    data: {
        // 这里是一些组件内部数据
        str: 'test_b'
    },
    methods: {
        // 这里是一个自定义方法
        onTap (e) {
            console.log(e)
            this.setData({
                str: 'onTap-test_b'
            })
            this._sibling('../test_c/test_c').setData({
                str: 'onTap-test_c'
            })
        }
    }
})