import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

const l = console.log;

throwError("💩").subscribe({
  error: e => l(`Error: ${e}`)
})

throwError("💩").pipe(
  catchError(e => of("No worries. Sorted!😃")),
  finalize(() => { l('finalize'); }),
).subscribe(v => l(v));


// output:
//
// Error: 💩
// No worries. Sorted!😃
// finalize
