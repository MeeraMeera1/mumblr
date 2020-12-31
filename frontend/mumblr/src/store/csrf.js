import Cookies from 'js-cookie';

export async function fetch(url, options = {}) {
    //set options method to 'get' if there is no method
    options.method = options.method || 'GET';
    //set options headers to an empty object if there is no headers
    options.headers = options.headers || {};

    //if the options method is not 'get', then set the 'content-type' header to
        //'application/json', and set the "XSRF-TOKEN" header to the value of the 
        //"XSRF-TOKEN" Cookie
    if (options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] =
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
    }
    //call the default window's fetch with the url and the options passed in
    const res = await window.fetch(url, options);

    //If the reponse's body is JSON, then parse the JSON body and set it to a 
        //key of 'data' on the response
    const contentType = res.headers.get('content-type');
    if(contentType && contentType.includes('application/json')) {
        const data = await res.json();
        res.data = data;
    }

    //if the response status code is 400 or above, then throw an error with the
        //error being the response
    if (res.status >= 400) throw res;

    return res;
}
