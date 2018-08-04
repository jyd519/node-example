import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// 发出错误
const source = Observable.throw('This is an error!');
// 优雅地处理错误，并返回带有错误信息的 observable
const example = source.catch(val => Observable.of(`I caught: ${val}`));

// 输出: 'I caught: This is an error'
example.subscribe(
  (v) => console.log(v),
  err => console.log(err),
  () => console.log('completed')
);




var observable = Observable.from([0,1,2,3,4,5])
.map(
  function(value){
      if(value == 3){
        throw new Error("Value cannot be 3");
      }
    return value;
  })
  .catch( (err) => {console.log(err); return Observable.empty()})
;

observable.subscribe(
  function(value){
  console.log("onNext " + value);
  },
  function(error){
    console.log("Error: " + error.message);
  },
  function(){
    console.log("Completed!");
  });
