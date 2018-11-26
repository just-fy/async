const fetch = require('node-fetch');

class DataService {
    constructor(url) {
        this.url = url;
    }

    getUser(id) {
        const endPoint = `/users/${id}`;
        const errorMessage = "Не удалось получить данные пользователя";
        return this.fetchData(endPoint, errorMessage);
    }

    getPost(userId) {
        const endPoint = `/posts?userId=${userId}`;
        const errorMessage = "Не удалось получить посты пользователя";
        return this.fetchData(endPoint, errorMessage);
    }

    getComments(postId) {
        const endPoint = `/comments?postId=${postId}`;
        const errorMessage = "Не удалось получить комментарии пользователя";
        return this.fetchData(endPoint, errorMessage);
    }

    async fetchData(endpoint, errorMessage) {
        try {
            let response = await fetch(this.url + endpoint);
            return await response.json();
        } catch(error) {
            throw new Error(errorMessage);
        }
    }
}

(async () => {
    try {
        const dataService = new DataService("https://jsonplaceholder.typicode.com");
        const user = await dataService.getUser(1);
        const posts = await dataService.getPost(user.id);
        const getComments = await dataService.getComments(posts[0].id);
        console.log(getComments);
    } catch (error) {
        console.log(error);
    }
})();
