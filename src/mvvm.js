function Vue(opt) {
    this.data = opt.data || {};
    this.$el = document.querySelector(opt.el) || document.body;
    var textDom = this.$el.querySelectorAll('[v-text]');
    var modelDom = this.$el.querySelectorAll('[v-model]');
    var self = this;

    function observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(function(key) {
            hijack(data, key, data[key]);
        })
    }

    function hijack(data, key, val) {
        // 递归
        observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,         // 枚举
            configurable: false,      // 不可再配置
            get: function() {
                return val;
            },
            set: function(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                model2View();
            },
        })
    }

    function model2View() {
        textDom.forEach(function(node) {
            node.innerText = self.data[node.getAttribute('v-text')];
        });
    }

    function watch() {
        modelDom.forEach(function(node) {
            node.addEventListener('keyup', function() {
                self.data[node.getAttribute('v-model')] = node.value;
            });
        });
    }

    observe(this.data);
    model2View();
    watch();
}

window.Vue = Vue;