// console.log(MyEvent);
function click(msg,msg1){
  alert("click event msg is " + msg +" and msg1 is " + msg1 );
}
MyEvent.on("click",click);
MyEvent.on("click",click,MyEvent);
MyEvent.on("click",click,this);
MyEvent.on("change",function(msg){
  alert("change event msg is "+ msg);
});
MyEvent.on("click dbclick",function(msg){
  alert("click dbclick event msg is " + msg);
},this);
// MyEvent.off("click");
 // MyEvent.off("click",click);
// MyEvent.off("click",null,MyEvent);
// MyEvent.off();

// MyEvent.trigger("click","msg","msg1");
MyEvent.once("aa",function(msg){
  alert("once event test params is " + msg );
});
MyEvent.trigger("aa","once");
MyEvent.trigger("aa","once");
console.log(MyEvent);