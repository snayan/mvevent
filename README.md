# customer-event
define and trigger your customer event 

#bind event for example:
MyEvent.on("change",function(msg){
  alert("change event msg is "+ msg);
});
MyEvent.on("click dbclick",function(msg){
  alert("click dbclick event msg is " + msg);
},this);

#unbind event for example:
MyEvent.off("click"); // remove all "click" events callback for all context 
MyEvent.off("click",click);// remove "click" events callback only for click callback and all context 
MyEvent.off("click",null,MyEvent);//remove "click" events callback only for Myevent context and all callback
MyEvent.off(); // remove all events callback for all event type and all callback and all context 

#trigger event for example:
MyEvent.trigger("click","once");
you can pass any your params in trigger then using in callback 


