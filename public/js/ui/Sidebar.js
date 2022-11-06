/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
    /**
     * Запускает initAuthLinks и initToggleButton
     * */
    static init() {
        this.initAuthLinks();
        this.initToggleButton();
    }

    /**
     * Отвечает за скрытие/показа боковой колонки:
     * переключает два класса для body: sidebar-open и sidebar-collapse
     * при нажатии на кнопку .sidebar-toggle
     * */
    static initToggleButton() {
        let body = document.querySelector('.sidebar-mini');
        let button = document.querySelector('.sidebar-toggle');

        button.addEventListener('click', () => {
            body.classList.toggle('sidebar-open');
            body.classList.toggle('sidebar-collapse');
        })
    }

    static initAuthLinks() {
        let sidebarItem = document.querySelector('.sidebar-menu').querySelectorAll('.menu-item');
        sidebarItem.forEach(element => {
            if (element.classList.contains('menu-item_login')) {
                element.addEventListener('click', () => {
                    let login = App.getModal('login');
                    login.open();
                })
            }
            if (element.classList.contains('menu-item_register')) {
                element.addEventListener('click', () => {
                    let register = App.getModal('register');
                    register.open();
                })
            }
            if (element.classList.contains('menu-item_logout')) {
                element.addEventListener('click', () => {
                    User.logout();
                    App.setState('init');
                })
            }
        });
    }
}