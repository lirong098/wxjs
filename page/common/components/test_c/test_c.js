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
        str: 'test_c'
    },
    methods: {
        // 这里是一个自定义方法
        onTap (e) {
            console.log('gwww', e, this)
            this.setData({
                str: 'onTap-test_c2'
            })
            let obj = this._sibling('../test_b/test_b')
            console.log('gdfg', obj)
            obj.setData({
                str: 'onTap-test_b2'
            })
        }
    }
})