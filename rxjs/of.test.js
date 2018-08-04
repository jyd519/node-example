import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

var example = Observable.of(1, 2, 3).map(x => x + '!!!'); // etc

example.subscribe(
  (v) => console.log(v),
  err => console.log(err),
  () => console.log('completed')
);

