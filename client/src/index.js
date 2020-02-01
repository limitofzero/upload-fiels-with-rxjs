import {fromEvent, Observable} from "rxjs";
import {map, switchMap, filter, takeUntil, exhaustMap} from "rxjs/operators";

const input = document.querySelector('#file');
const uploadBtn = document.querySelector('#upload');
const progressBar = document.querySelector('#progress-bar');
const cancelBtn = document.querySelector('#cancel');

const fromUploadBtn = fromEvent(uploadBtn, 'click');
const fromCancelBtn = fromEvent(cancelBtn, 'click');

fromEvent(input, 'change').pipe(
    switchMap(() => fromUploadBtn),
    map(() => input.files[0]),
    filter(file => !!file),
    map(file => createFormData(file)),
    exhaustMap(data => upload(data).pipe(
        takeUntil(fromCancelBtn)
    ))
).subscribe({
    next: width => setProgressBarWidth(width)
});

function setProgressBarWidth(width) {
    progressBar.style.width = `${width}%`;
}

function createFormData(file) {
    const form = new FormData();
    form.append('file', file);
    return form;
}

function upload(data) {
    return new Observable(observer => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = e => {
            const progress = e.loaded / e.total * 100;
            observer.next(progress);
        };

        xhr.onerror = e => observer.error(e);
        xhr.onload = () => observer.complete();

        xhr.open('POST', '/upload', true);
        xhr.send(data);

        return () => xhr.abort();
    });
}
