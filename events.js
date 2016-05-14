(function(self){

  var MyEvent=self.MyEvent||(self.MyEvent={});

  var _eventSplit=/\s+/;

  //将指定事件添加到事件集合中
  function _addEvent(events,name,callback,context,opts){
    if(name){
      var handlers=events[name]||(events[name]=[]);
      opts=opts||{};
      handlers.push({
        callback:callback||function(){},
        context:context||null,
        once:opts.once||false
      });
    }
    return events;
  }

  //将指定事件从事件集合中移除
  function _offEvent(events,name,callback,context){
    if(!events){return;}
    names=name?[name]:_keys(events);
    var handlers=[],remain=[];
    _forEach(names,function(n){
      handlers=events[n],remain=[];
      _forEach(handlers,function(h){
        if((callback&& callback!==h.callback)||(context&&context!==h.context)){
          remain.push(h);
        }
      });
      if(remain.length>0){
          events[n]=remain;
        }
        else{
          delete events[n];
        }
    });
    return events;
  }

  //触发事件
  function _triggerEvent(events,name,callback,context,opts){
    if(!events)return;
    var handlers=events[name]||[];
    var args=opts.arguments||[];
    _forEach(handlers,function(h){
      _internalCall(h.callback,h.context,args);
      //如果是只触发一次的事件，则触发之后移除
      if(h.once){
        events=_offEvent(events,name,callback,context);
      }
    });
    return events;
  }

  //内部出发事件
  function _internalCall(callback,context,args){
    if(callback && callback instanceof Function){
      args=args.slice();
      var l=args.length;
      switch(l){
        case 0:callback.call(context);return;
        case 1:callback.call(context,args[0]);return;
        case 2:callback.call(context,args[0],args[1]);return;
        case 3:callback.call(context,args[0],args[1],args[2]);return;
        default:callback.apply(context,args);return;
      }
    }
  }

  //事件API迭代
  function _eventApi(iterate,events,name,callback,context,opts){
    var names=_eventSplit.test(name)?name.split(_eventSplit):[name];
      _forEach(names,function(n){
        events=iterate(events,n,callback,context,opts);
      });
    return events;
  }

  //将对象的属性以数组形式返回
  function _keys(object){
    var arr=[];
    if(object && typeof object==="object"){
      for(var a in object){
        arr.push(a);
      }
    }
    return arr;
  }

  //遍历数组
  function _forEach(array,callback){
    if(array && callback && array instanceof Array && callback instanceof Function){
      for(var i=0,j=array.length;i<j;i++){
        callback.call(null,array[i]);
      }
    }
  }
  //添加事件
  MyEvent.on=function(name,callback,context,opts){
    this._events=_eventApi(_addEvent,this._events||(this._events={}),name,callback,context,opts);
    return this;
  },

  //移除事件
  MyEvent.off=function(name,callback,context){
    this._events=_eventApi(_offEvent,this._events||(this._events={}),name,callback,context);
    return this;
  },

  //触发事件
  MyEvent.trigger=function(name){
    if(!this._events)return;

    //获取到去除name的参数，并把这些参数传递给callback
    var l=Math.max(0,arguments.length-1);
    var args=new Array(l);
    for(var i=0;i<l;i++){
      args[i]=arguments[i+1];
    }

    this._events=_eventApi(_triggerEvent,this._events,name,null ,null,{arguments:args});

    return this;

  },

  //添加只执行一次的事件
  MyEvent.once=function(name,callback,context){

    this.on(name,callback,context,{once:true});

  }


})(window);