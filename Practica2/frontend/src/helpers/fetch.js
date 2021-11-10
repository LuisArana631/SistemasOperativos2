const fetchManage = ( endpoint, body, method = 'GET' ) => {
    const url = 'http://34.133.206.223:80/' + endpoint;

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