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
        let sidebarMini = document.querySelector('.sidebar-mini');

        sidebarMini.addEventListener('click', () => {
            if (!sidebarMini.className.includes('sidebar-open')) {
                sidebarMini.classList.add('sidebar-open');
                sidebarMini.classList.add('sidebar-collapse');
            } else {
                sidebarMini.classList.remove('sidebar-open');
                sidebarMini.classList.remove('sidebar-collapse');
            }
        });
    }

    /**
     * При нажатии на кнопку входа, показывает окно входа
     * (через найденное в App.getModal)
     * При нажатии на кнопку регастрации показывает окно регистрации
     * При нажатии на кнопку выхода вызывает User.logout и по успешному
     * выходу устанавливает App.setState( 'init' )
     * */
    static initAuthLinks() {
        let btnRegister = document.querySelector('.menu-item_register');
        let btnLogin = document.querySelector('.menu-item_login');
        let btnClose = document.querySelectorAll('button');

        btnRegister.addEventListener('click', e => {
            e.preventDefault();
            let registerModal = App.getModal('register');
            let modal = new Modal(registerModal);

            modal.open()
        });

        btnLogin.addEventListener('click', e => {
            e.preventDefault();
            let loginModal = App.getModal('login');
            let modal = new Modal(loginModal);

            modal.open()
        });

        btnClose.forEach(elem => {
            elem.addEventListener('click', e => {
                if (elem.dataset.dismiss === 'modal') {
                    let currentModal = elem.closest('.modal');
                    let modal = new Modal(currentModal);
                    modal.close();
                }
            });
        });

    }
}