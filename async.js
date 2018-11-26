const { getUser, getPosts, getComments } = require('./db');
//Generators
function co(generator) {
    const iterator = generator();

    return new Promise((resolve, reject) => {
        function run(prev) {
            const { value, done } = iterator.next(prev);

            if (done) {
                resolve(value);
            } else if (value instanceof Promise) {
                value.then(run, reject);
            } else {
                run(value);
            }
        }
        run();
    });
}

co(function* () {
   try {
       let user = yield getUser(1);
       let posts = yield getPosts(user.id);
       let comments = yield getComments(posts[0].id);

       console.log(comments);
   } catch (error) {
       console.error(error);
   }
});

//Promises
/*getUser(1)
    .then(user => getPosts(user.id))
    .then(posts => getComments(posts[0].id))
    .then(comments => console.log(comments))
    .catch(error => console.error(error));*/

// Callback hell
/*
getUser(1, (error, user) => {
    if (error) return console.error(error);

    getPosts(user.id, (error, posts) => {
        if (error) return console.error(error);

        getComments(posts[0].id, (error, comments) => {
            if (error) return console.error(error);

            console.log(comments);
        });
    });
});*/
