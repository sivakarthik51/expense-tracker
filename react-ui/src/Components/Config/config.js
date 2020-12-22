let config = {

};
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    config = {
       apiUrl: 'http://localhost:8000'

    };
} else {
    config = {
        apiUrl: ''
 
     };
}


export default config;