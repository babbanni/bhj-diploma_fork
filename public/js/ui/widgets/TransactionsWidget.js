/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
    /**
     * Устанавливает полученный элемент
     * в свойство element.
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        if (element) {
            this.element = element;
            this.registerEvents();
        } else {
            console.error('Элемент не найден!');
        }
    }

    /**
     * Регистрирует обработчики нажатия на
     * кнопки «Новый доход» и «Новый расход».
     * При нажатии вызывает Modal.open() для
     * экземпляра окна
     * */
    registerEvents() {
        const buttons = this.element.querySelectorAll('.btn');
        buttons.forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.classList.contains('create-income-button')) {
                    App.getModal('newIncome').open()
                }
                if (element.classList.contains('create-expense-button')) {
                    App.getModal('newExpense').open()
                }
            })
        });
    }
}