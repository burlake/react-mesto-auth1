class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
    }

    getInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about,
            }),
        }).then(this._checkResponse);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse);
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._checkResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        let method = 'DELETE';

        if (isLiked) {
            method = 'PUT';
        }
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: method,
            headers: {
                authorization: this._authorization,
            }
        }).then(this._checkResponse);
    }

    // addLike(cardId) {
    //     return fetch (`${this._url}/cards/${cardId}/likes`, {
    //         method: 'PUT',
    //         headers: {
    //             authorization: this._authorization,
    //         }
    //     })
    //     .then(this._checkResponse)
    // }

    // deleteLike(cardId) {
    //     return fetch (`${this._url}/cards/${cardId}/likes`, {  //альтернатива`-  ссылка
    //         method: 'DELETE',
    //         headers: {
    //             authorization: this._authorization,
    //         }
    //     })
    //     .then(this._checkResponse)
    // }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: "DELETE",
            headers: {
                authorization: this._authorization,
            },
        }).then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-69",
    headers: {
        authorization: "ae20785e-e850-4452-960a-73f188fc9474",
        "Content-Type": "application/json",
    },
});

export default api;
