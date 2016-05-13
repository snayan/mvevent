(function(self){

  var Event=self.Event||{};

  var _eventSplit=/\s+/;

  //将指定事件添加到事件集合中
  function _addEvent(events,name,callback,context){
    if(name){
      var handlers=events[name]||(events[name]=[]);
      handlers.push({
        callback:callback||void 0,
        context:context
      });
    }
    return events;
  }

  //将指定事件从事件集合中移除
  function _offEvent(events,name,callback,context){
    if(!events){return;}
    names=name?[name]:_keys(events);
    var handlers=[],remain=[];
    names.forEach(function(i,n){
      handlers=events[n],remain=[];
      handlers.forEach(function(j,d){
        if((callback&&callback!==d.callback)||(context&&context!==d.context)){
          remain.push(d);
        }
      });
      if(remain.length>0){
        events[n]=remain;
      }
    });
  }

  //事件API迭代
  function _eventApi(iterate,events,name,callback,context){
    if(typeof name ==="string"){
      var names=_eventSplit.test(name)?name.split(_eventSplit):[name];
      names.forEach(function(i,n){
        events=iterate(events,n,callback,context);
      });
    }
    reutrn events;
  }

  //将对象的属性以数组形式返回
  function _keys(object){
    var arr=[];
    if(object && typeof object==="object"){
      forEach(var a in object){
        arr.push(a);
      }
    }
    return arr;
  }

  //添加事件
  Event.on=function(name,callback,context){
    this._events=_eventApi(_addEvent,this._events||(this._events={}),name,callback,context);
    return this;
  },

  //移除事件
  Event.off=function(name,callback,context){
    this._events=_eventApi(_offEvent,this._events||(this._events={}),name,callback,context);
    return this;
  },

  //触发事件
  Event.trigger=function(name){

  },

  //添加只执行一次的事件
  Event.once=function(name,callback,context){

  }

})(window);