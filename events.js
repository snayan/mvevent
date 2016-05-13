(function(self){
  var Events=self.Events={};

  var eventSplitter=/\s+/;

  //iterate fn to add events to event
  function eventsApi(fn,events,name,callback,options){
    var names,i=0,j=0;
    if(name && eventSplitter.test(name)){
      for(names=name.split(eventSplitter),j=names.length;i<j;i++){
        events=fn(events,names[i],callback,options);
      }
    }
    else{
      events=fn(events,name,callback,options);
    }
    return events;
  }

  function addEvent(events,name,callback,options){
    if(callback){
      var hander=events[name]||(events[name]=[]);
      hander.push({
        callback:callback,
        context:options.context
      });
    }
    return events;
  }

  Events.on=function(name,callback,context){
    var that=this;
    this._events=eventsApi(addEvent,this._events||{},name,callback,{
      context:context||that
    });
    return this;
  }

})(window);