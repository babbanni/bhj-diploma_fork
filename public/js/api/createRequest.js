/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    let url;
    let method;
    let data;
    if (options.method) {
        data = Object.entries(options.data);
        method = options.method;
        url = options.url;
        if (method === 'GET') {
            url += '?';
            for ([key, value] of data) {
                url += key + '=' + value + '&';
            }
        }
        if (method !== 'GET') {
            this.formData = new FormData;
            for ([key, value] of data) {
                formData.append(key, value);
            }
        }
    }


    xhr.responseType = 'json';

    try {
        xhr.open(method, url);
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState == xhr.DONE && xhr.status === 200) {
                options.callback(xhr.response.error, xhr.response);
            }
        });

        xhr.send(method === 'GET' ? {} : this.formData);

    } catch (error) {
        console.log(error);
    }
}