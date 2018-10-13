import { of, asyncScheduler } from 'rxjs';
import { subscribeOn, finalize } from 'rxjs/operators';

const l = console.log;

// Changes Source Execution
of(1).pipe(subscribeOn(asyncScheduler))
  .subscribe({
    next: x => l(x),
    complete: () => l('3')
  });
l('2');

// a) 1 2 3
// b) 2 1 3  OK
// c) 1 3 2
