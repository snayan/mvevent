# mvevent
define and trigger your event 

## What's it

mvevent is a object that can define your own event name and trigger event in everywhere and everywhen.
it has no dependencies.

## Usage

* `npm install mvevent` or 

  `bower install mvevent `

* include `mvevent.js` in your app

## Example

you can use it like using browser's event style, `$div.on('click',fu)` or `$div.off('click')`.

* ##### bind event
```
    //if you don't give callback function ,the callback function will be empty function by default.
    //if you don't give context ,the context will be empty object by default.
    MvEvent.on('name');
    MvEvent.on('name',fn);
    MvEvent.on('name',fn,context);
```
you can bind a event that will be removed when it is triggered once;
```
    Mvevent.once('name',fn,context);
```

* ##### unbind event
if you only give event name,then will remove all events associated with name.
you also can give the callback function or context.

```
MvEvent.off('name');
MvEvent.off('name',fn);
MvEvent.off('name',fn,context);
```

* ##### trigger event
trigger event with your arguments.

```
    MvEvent.trigger('name');
    MvEvent.trigger('name',arg,args,...);
```

## Contributing
I welcome contributions of all kinds from anyone.
* [Bug reports](https://github.com/snayan/mvevent/issues) 
* [Feature requests](https://github.com/snayan/mvevent/issues)
* [Pull requests](https://github.com/snayan/mvevent/pulls)

## License
Licensed under the MIT License


