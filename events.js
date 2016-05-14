(function(self){

  var MyEvent=self.MyEvent||(self.MyEvent={});

  var _eventSplit=/\s+/;

  //将指定事件添加到事件集合中
  function _addEvent(events,name,callback,context){
    if(name){
      var handlers=events[name]||(events[name]=[]);
      handlers.push({
        callback:callback||function(){},
        context:context||null
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

  //事件API迭代
  function _eventApi(iterate,events,name,callback,context){
    var names=_eventSplit.test(name)?name.split(_eventSplit):[name];
      _forEach(names,function(n){
        events=iterate(events,n,callback,context);
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
  MyEvent.on=function(name,callback,context){
    this._events=_eventApi(_addEvent,this._events||(this._events={}),name,callback,context);
    return this;
  },

  //移除事件
  MyEvent.off=function(name,callback,context){
    this._events=_eventApi(_offEvent,this._events||(this._events={}),name,callback,context);
    return this;
  },

  //触发事件
  MyEvent.trigger=function(name){

  },

  //添加只执行一次的事件
  MyEvent.once=function(name,callback,context){

  }

  // console.log(MyEvent);

})(window);