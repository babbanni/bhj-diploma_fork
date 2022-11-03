/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
    /**
     * Устанавливает текущий элемент в свойство element
     * Регистрирует обработчики событий с помощью Modal.registerEvents()
     * Если переданный элемент не существует,
     * необходимо выкинуть ошибку.
     * */
    constructor(element) {
        try {
            this.element = element;
            this.registerEvents();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * При нажатии на элемент с data-dismiss="modal"
     * должен закрыть текущее окно
     * (с помощью метода Modal.onClose)
     * */
    registerEvents() {
        let btns = document.querySelectorAll('button');

        btns.forEach(elem => {
            elem.addEventListener('click', () => {
                if (elem.dataset.dismiss === 'modal') {
                    this.onClose(elem);
                }
            });
        });
    }

    /**
     * Срабатывает после нажатия на элементы, закрывающие окно.
     * Закрывает текущее окно (Modal.close())
     * */
    onClose(e) {
            e.addEventListener('click', (ev) => {
                ev.preventDefault();
                this.close();
            })
        }
        /**
         * Открывает окно: устанавливает CSS-свойство display
         * со значением «block»
         * */
    open() {
            this.element.element.style.display = 'block';
        }
        /**
         * Закрывает окно: удаляет CSS-свойство display
         * */
    close() {
        this.element.style.removeProperty('display');
    }
}