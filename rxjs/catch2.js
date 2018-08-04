import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/startWith';


var source = Observable.from(['a','b','c','d',2])
            .zip(Observable.interval(500), (x,y) => x)
            .map(x => x.toUpperCase());
            // 通常 source 會是建立即時同步的連線，像是 web socket

var example = source.catch(
                (error, obs) => Rx.Observable.empty()
                               .startWith('連線發生錯誤： 5秒後重連')
                               .concat(obs.delay(5000))
                 );

example.subscribe({
    next: (value) => { title.innerText = value },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
