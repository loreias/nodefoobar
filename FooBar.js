var prompt  = require('prompt');
prompt.start();

console.log("Which ever number you assign to foo a ba will be replace it in the counter");

prompt.get([
    {
        name: 'counter',
        description: 'How higth you want me to count. Give me a number',
        type: 'integer',
        required: true,
        message: 'Please, do not use 0.',
        conform: function(counter) {
            return ( counter );
        },
        message: 'Lets do at least 10.',
        conform: function(counter) {
            return ( counter >= 10);
        },        
    },    

    {
        name: 'foo',
        description: 'Assign Foo an integer value between.',
        type: 'integer',
        required: true,
        message: 'Please, do not use 0',
        conform: function(foo) {
            return (foo);
        },
        message: 'This value can not be equal to the Counter.',
        conform: function(foo) {
            var counter = prompt.history('counter').value;
            return counterValidator(foo, counter);
        }                
    },

    {
        name: 'bar',
        description: 'Assign Bar an integer value.',
        type: 'integer',
        required: true,
        message: 'Please, not use the same value as Bar or 0.',
        conform: function(bar) {
            var foo = prompt.history('foo').value;
            return ( bar && foo !== bar );
        },
        message: 'This value can not be equal to the Counter.', 
        conform: function(bar) {
            var counter = prompt.history('counter').value;
            return counterValidator(bar, counter);
        }         
    },
], function(err, results)
{
    var outPut = new Array(results.counter);
    for (var i = 1; i < outPut.length; i++) {
        var foo = i % results.foo,
            bar = i % results.bar;

        outPut[i] = global.getFooOrBar(i, foo, bar);
    }
    
    console.log(outPut);
    return;


});

var counterValidator = function(currentVar, counter){
    return ( currentVar && currentVar < counter );
}

/**
 * returns foo bar value.
 * @param  i   integer, current interation
 * @param  foo integer, result of i%foo
 * @param  bar integer, result of i%bar
 * @return string.
 */
global.getFooOrBar = function( i, foo, bar){
    switch (true) {
        case (!(foo + bar)):
            return "foo-bar";
            break;
        case (!foo):
            return "foo";
            break;
        case (!bar):
            return "bar";
            break;                                    
        default:
            return i;
        break;
    }
}