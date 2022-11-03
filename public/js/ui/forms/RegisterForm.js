/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
    /**
     * Производит регистрацию с помощью User.register
     * После успешной регистрации устанавливает
     * состояние App.setState( 'user-logged' )
     * и закрывает окно, в котором находится форма
     * */
    onSubmit(data) {
        debugger
        User.register(data, (err, response) => {
            this.element.reset();
            debugger
            if (response.success === 'true') {
                App.setState('user-logged');
                App.getModal('register').close();
            } else {
                alert(err);
            }
        });
    }
}