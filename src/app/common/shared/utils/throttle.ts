import { Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

const timer: number = 300;

export function throttle(subject: Subject<any>, ngUnsubscirbe$: Subject<any>) {
    return subject.pipe(
        debounceTime(timer),
        takeUntil(ngUnsubscirbe$)
    )
}

export function destroyThrottle(subject: Subject<any>, ngUnsubscirbe$: Subject<any>) {
    subject.next();
    subject.complete();
    ngUnsubscirbe$.next();
    ngUnsubscirbe$.complete();
}