class AsyncForm {
    constructor(element) {
        try {
            this.element = element;
            this.registerEvents();
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Необходимо запретить отправку формы и в момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', e => {
            e.preventDefault();
            this.submit();
        });
    }

    /**
     * Преобразует данные формы в объект вида
     * {
     *  'название поля формы 1': 'значение поля формы 1',
     *  'название поля формы 2': 'значение поля формы 2'
     * }
     * */
    getData() {
        let formData = new FormData(this.element);
        let entries = formData.entries();
        debugger

        for (let i of entries) {
            let key = i[0];
            let value = i[1];
            let objectEntries = { key, value };
            return objectEntries;
        }
    }

    onSubmit(options) {

    }

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        let objectEntries = this.getData();
        this.onSubmit(objectEntries);
    }
}