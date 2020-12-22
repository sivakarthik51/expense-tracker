export default function configureBackend() {
    let users = [{ id: 1, username: 'test@test.com', password: 'test', firstName: 'Test', lastName: 'User' }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer fake-jwt-token';
        console.log(opts);
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/user/login') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.username === params.email && x.password === params.password);
                    if (!user) return error('Username or password is incorrect');
                    return ok({
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, json: () => Promise.resolve(body) })
                }

                function unauthorised() {
                    resolve({ status: 401, json: () => Promise.resolve({ message: 'Unauthorised' }) })
                }

                function error(message) {
                    resolve({ status: 400, json: () => Promise.resolve({ message }) })
                }
            }, 500);
        });
    }
}