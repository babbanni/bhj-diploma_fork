/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью
     * AccountsWidget.registerEvents()
     * Вызывает AccountsWidget.update() для получения
     * списка счетов и последующего отображения
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (element) {
            this.element = element;
            this.registerEvents();
            this.update();

        } else {
            console.error('Ошибка! Элемент не существует!');
        }
    }

    /**
     * При нажатии на .create-account открывает окно
     * #modal-new-account для создания нового счёта
     * При нажатии на один из существующих счетов
     * (которые отображены в боковой колонке),
     * вызывает AccountsWidget.onSelectAccount()
     * */
    registerEvents() {
        const btnAccount = this.element.querySelector('.create-account');
        btnAccount.addEventListener('click', () => {
            App.getModal('createAccount').open();
        })
        this.element.addEventListener('click', (e) => {
            const account = e.target.closest('.account')
            if (account) {
                e.preventDefault();
                this.onSelectAccount(account);
            }
        })
    }

    /**
     * Метод доступен только авторизованным пользователям
     * (User.current()).
     * Если пользователь авторизован, необходимо
     * получить список счетов через Account.list(). При
     * успешном ответе необходимо очистить список ранее
     * отображённых счетов через AccountsWidget.clear().
     * Отображает список полученных счетов с помощью
     * метода renderItem()
     * */
    update() {
        const user = User.current();
        if (user !== undefined) {
            Account.list(user, (err, response) => {
                if (response.success) {
                    this.clear();
                    this.renderItem(response.data);
                } else {
                    alert(err);
                }
            });
        }
    }

    /**
     * Очищает список ранее отображённых счетов.
     * Для этого необходимо удалять все элементы .account
     * в боковой колонке
     * */
    clear() {
        const accounts = this.element.querySelectorAll('.account');
        accounts.forEach(element => {
            element.remove()
        });
    }

    /**
     * Срабатывает в момент выбора счёта
     * Устанавливает текущему выбранному элементу счёта
     * класс .active. Удаляет ранее выбранному элементу
     * счёта класс .active.
     * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
     * */
    onSelectAccount(element) {
        const activeAccount = this.element.querySelector('.active');
        if (activeAccount) {
            activeAccount.classList.remove('active');
        }
        element.classList.add('active');

        App.showPage('transactions', { account_id: element.dataset.id });
    }

    /**
     * Возвращает HTML-код счёта для последующего
     * отображения в боковой колонке.
     * item - объект с данными о счёте
     * */
    getAccountHTML(item) {
        const accountElement = item.innerHTML = `
      <li class="account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum}</span>
        </a>
      </li>
      `;
        return accountElement;
    }

    /**
     * Получает массив с информацией о счетах.
     * Отображает полученный с помощью метода
     * AccountsWidget.getAccountHTML HTML-код элемента
     * и добавляет его внутрь элемента виджета
     * */
    renderItem(data) {
        data.forEach(item => {
            this.element.insertAdjacentHTML('beforeend', this.getAccountHTML(item));
        });
    }
}