/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {

    static URL = '/account';

    /**
     * Получает информацию о счёте
     * */
    static get(id = '', callback) {
        this.list(User.current(), (err, response) => {
            if (response.success) {
                const accountName = response.data.find(accountNames => accountNames['id'] === id)
                callback(err, accountName.name)
            } else {
                alert(err);
            }
        })
    }
}