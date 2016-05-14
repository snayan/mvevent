// console.log(MyEvent);
function click(msg){
  alert("click event msg is " + msg);
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
MyEvent.off("click",click,MyEvent);

console.log(MyEvent);