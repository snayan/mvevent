var obj=new Event();
obj.on("click",function(s){
  //do something in callback
});
obj.on("dbclick",function(s){
  //do something in callback
});
console.log(obj._events);
//print
{
  "click":[{
    callback:function,
    context:this
  }],
  "dbclick":[{
    callback:function,
    context:this
  }]
}
