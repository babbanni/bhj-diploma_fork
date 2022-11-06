class AsyncForm {
    constructor(element) {
        if (element) {
            this.element = element;
            this.registerEvents();
        } else {
            console.error('Элемент не найден!');
        }
    }

    /**
     * Необходимо запретить отправку формы и в момент отправки
     * вызывает метод submit()
     * */
    registerEvents() {
        this.element.addEventListener('submit', (e) => {
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
        const formData = new FormData(this.element);
        let entries = formData.entries();
        let returnData = {};

        for (const i of entries) {
            const key = i[0];
            const value = i[1];
            returnData[key] = value;
        }
        return returnData;
    }

    onSubmit(options) {

    }

    /**
     * Вызывает метод onSubmit и передаёт туда
     * данные, полученные из метода getData()
     * */
    submit() {
        let data = this.getData();
        this.onSubmit(data);
    }
}