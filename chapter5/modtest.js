/**
 * Created by Lele on 2014/11/6.
 */
var mm = require('./mymodule');
mm.hello_world();
mm.goodbye();
mm.create_greeter("en");
mm.create_greeter("de");
mm.create_greeter("jp");

var ABCClass = require('./conmod2');
var obj = new ABCClass();
obj.functionA(1, 2);