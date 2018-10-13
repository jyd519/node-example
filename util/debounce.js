function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function debounce2(func, wait) {
    let timeout;
    return function() {
        let context = this, args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

var test = {
  prop: 'test',
  fn2: function() {
    return ()=> {console.log('fn2')};
  }(),

  fn: debounce2(function () {
    console.log('hello', this.prop);
  } , 2000, false),

};

test.fn();
test.fn();
test.fn();
test.fn();
test.fn2();
setTimeout( () => { test.fn(); },  2000 );

