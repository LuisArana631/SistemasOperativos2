const fetchManage = ( endpoint, body, method = 'GET' ) => {
    const url = 'http://34.136.244.114:80/' + endpoint;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( body )
        });
    }
        

}

export {
    fetchManage
}