;(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        // AMD (+ global for extensions)
        define(function () {
            return (root.MvEvent = factory());
        });
    } else if (typeof exports === "object") {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser
        root.MvEvent = factory();
    }
})(this, function () {

    var MvEvent = {};

    //定义一个空的对象上下文，防止传入null时，会改变全局对象。
    var _emptyCxt = Object.create(null);

    //定义一个空的回调函数
    var _emptyFn = function () {
    };

    var _toString = Object.prototype.toString;

    var _isFunction = function (fn) {
        return _toString.call(fn) === '[object Function]';
    };

    var _eventSplit = /\s+/;

    //将指定事件添加到事件集合中
    function _addEvent(events, name, callback, context, opts) {
        if (name) {
            var handlers = events[name] || (events[name] = []);
            opts = opts || {};
            handlers.push({
                callback: _isFunction(callback) ? callback : _emptyFn,
                context: context || _emptyCxt,
                once: opts.once || false
            });
        }
        return events;
    }

    //将指定事件从事件集合中移除
    function _offEvent(events, name, callback, context) {
        if (!events) {
            return;
        }
        var names = name ? [name] : _keys(events);
        var handlers = [], remain = [];
        _forEach(names, function (name) {
            handlers = events[name], remain = [];
            _forEach(handlers, function (handler) {
                if ((callback && callback !== handler.callback) || (context && context !== handler.context)) {
                    remain.push(handler);
                }
            });
            if (remain.length > 0) {
                events[name] = remain;
            }
            else {
                delete events[name];
            }
        });
        return events;
    }

    //触发事件
    function _triggerEvent(events, name, callback, context, opts) {
        if (!events) {
            console.warn('events is empty,please define first,like MvEvent.on("click").');
            return;
        }
        var handlers = events[name] || [];
        var args = opts.arguments || [];
        if (!handlers.length) {
            console.warn('event "' + name + '" is not defined,please define first.');
            return events;
        }
        _forEach(handlers, function (h) {
            _internalCall(h.callback, h.context, args);
            //如果是只触发一次的事件，则触发之后移除
            if (h.once) {
                events = _offEvent(events, name, callback, context);
            }
        });
        return events;
    }

    //内部出发事件
    function _internalCall(callback, context, args) {
        if (_isFunction(callback)) {
            args = args.slice();
            var l = args.length;
            switch (l) {
                case 0:
                    callback.call(context);
                    return;
                case 1:
                    callback.call(context, args[0]);
                    return;
                case 2:
                    callback.call(context, args[0], args[1]);
                    return;
                case 3:
                    callback.call(context, args[0], args[1], args[2]);
                    return;
                default:
                    callback.apply(context, args);
                    return;
            }
        }
    }

    //事件API迭代
    function _eventApi(iterate, events, name, callback, context, opts) {
        var names = _eventSplit.test(name) ? name.split(_eventSplit) : [name];
        _forEach(names, function (name) {
            events = iterate(events, name, callback, context, opts);
        });
        return events;
    }

    //将对象的属性以数组形式返回
    function _keys(object) {
        return Object.keys(object);
    }

    //遍历数组
    function _forEach(array, callback) {
        if (array && callback && array instanceof Array && callback instanceof Function) {
            for (var i = 0, j = array.length; i < j; i++) {
                callback.call(_emptyCxt, array[i]);
            }
        }
    }

    //添加事件
    MvEvent.on = function (name, callback, context, opts) {
        this._events = _eventApi(_addEvent, this._events || (this._events = {}), name, callback, context, opts);
        return this;
    };

    //移除事件
    MvEvent.off = function (name, callback, context) {
        this._events = _eventApi(_offEvent, this._events || (this._events = {}), name, callback, context);
        return this;
    };

    //触发事件
    MvEvent.trigger = function (name) {
        if (!this._events) {
            console.warn('events is empty,please define first,like MvEvent.on("click").');
            return;
        }
        var args = [].slice.call(arguments, 1);
        this._events = _eventApi(_triggerEvent, this._events, name, null, null, {arguments: args});
        return this;

    };

    //添加只执行一次的事件
    MvEvent.once = function (name, callback, context) {
        return this.on(name, callback, context, {once: true});
    };

    return MvEvent;
});
