import './_auth.scss';

class AuthModalView {
  static drawSignInModal() {
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal modal__signin hidden';

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal__overlay';

    const authModal = document.createElement('div');
    authModal.className = 'modal__auth';

    const cancel = document.createElement('img');
    cancel.className = 'cancel';
    cancel.alt = 'cancel';
    cancel.src = '../../assets/images/cancel.png';

    const authTitle = document.createElement('h2');
    authTitle.className = 'auth-title';
    authTitle.textContent = 'Войти';

    const singInForm = document.createElement('form');
    singInForm.className = 'form singin-form';

    const authEmail = document.createElement('div');
    authEmail.className = 'input-container';

    const inputEmail = document.createElement('input');
    inputEmail.className = 'auth-input';
    inputEmail.id = 'signin-email';
    inputEmail.type = 'email';
    inputEmail.placeholder = ' ';
    inputEmail.autofocus = true;
    inputEmail.required = true;

    const labelEmail = document.createElement('label');
    labelEmail.className = 'label';
    labelEmail.setAttribute('for', authEmail.id);
    labelEmail.textContent = 'E-mail';

    const labelEmailPocket = document.createElement('div');
    labelEmailPocket.className = 'label-pocket';

    const authPassword = document.createElement('div');
    authPassword.className = 'input-container';

    const inputPassword = document.createElement('input');
    inputPassword.className = 'auth-input';
    inputPassword.id = 'signin-password';
    inputPassword.type = 'password';
    inputPassword.required = true;
    inputPassword.placeholder = ' ';
    inputPassword.autocomplete = 'off';

    const labelPassword = document.createElement('label');
    labelPassword.className = 'label';
    labelPassword.setAttribute('for', authPassword.id);
    labelPassword.textContent = 'Пароль';

    const labelPasswordPocket = document.createElement('div');
    labelPasswordPocket.className = 'label-pocket';

    const authCheckBox = document.createElement('div');
    authCheckBox.className = 'checkbox-container';

    const checkBox = document.createElement('input');
    checkBox.className = 'checkbox';
    checkBox.type = 'checkbox';
    checkBox.value = 'signin';
    checkBox.id = 'show-password-signin';

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.className = 'checkbox-label';
    checkBoxLabel.setAttribute('for', checkBox.id);
    checkBoxLabel.textContent = 'Показать пароль';

    const authButton = document.createElement('input');
    authButton.className = 'auth-button';
    authButton.id = 'signin-button';
    authButton.name = 'submit';
    authButton.type = 'button';
    authButton.value = 'Войти на сайт';

    const signUp = document.createElement('div');
    signUp.className = 'auth-add';
    signUp.innerHTML = '<p>Нет аккаунта? <span class="auth-button_add" data-auth="signup">Зарегистрироваться</span></p>';

    authEmail.append(inputEmail, labelEmail, labelEmailPocket);
    authPassword.append(inputPassword, labelPassword, labelPasswordPocket);
    authCheckBox.append(checkBox, checkBoxLabel);
    singInForm.append(authEmail, authPassword, authCheckBox, authButton);
    authModal.append(cancel, authTitle, singInForm, signUp);
    modalWindow.append(modalOverlay, authModal);
    document.querySelector('body')?.append(modalWindow);
  }

  static drawSignUpModal() {
    const modalWindow = document.createElement('div');
    modalWindow.className = 'modal modal__signup hidden';

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal__overlay';

    const signUpModal = document.createElement('div');
    signUpModal.className = 'modal__auth';

    const cancel = document.createElement('img');
    cancel.className = 'cancel';
    cancel.alt = 'cancel';
    cancel.src = '../../assets/images/cancel.png';

    const signUpTitle = document.createElement('h2');
    signUpTitle.className = 'auth-title';
    signUpTitle.textContent = 'Зарегистрироваться';

    const signUpForm = document.createElement('form');
    signUpForm.className = 'form singup-form';

    const authName = document.createElement('div');
    authName.className = 'input-container';

    const signUpName = document.createElement('input');
    signUpName.className = 'auth-input';
    signUpName.id = 'signup-name';
    signUpName.placeholder = ' ';
    signUpName.type = 'text';
    signUpName.placeholder = ' ';
    signUpName.autofocus = true;
    signUpName.autocomplete = 'off';

    const labelName = document.createElement('label');
    labelName.className = 'label';
    labelName.setAttribute('for', labelName.id);
    labelName.textContent = 'Имя';

    const labelNamePocket = document.createElement('div');
    labelNamePocket.className = 'label-pocket';

    const authEmail = document.createElement('div');
    authEmail.className = 'input-container';

    const signUpEmail = document.createElement('input');
    signUpEmail.className = 'auth-input';
    signUpEmail.id = 'signup-email';
    signUpEmail.type = 'email';
    signUpEmail.autocomplete = 'off';
    signUpEmail.placeholder = ' ';

    const labelEmail = document.createElement('label');
    labelEmail.className = 'label';
    labelEmail.setAttribute('for', signUpEmail.id);
    labelEmail.textContent = 'E-mail';

    const labelEmailPocket = document.createElement('div');
    labelEmailPocket.className = 'label-pocket';

    const authPassword = document.createElement('div');
    authPassword.className = 'input-container';

    const signUpPassword = document.createElement('input');
    signUpPassword.className = 'auth-input';
    signUpPassword.id = 'signup-password';
    signUpPassword.type = 'password';
    signUpPassword.placeholder = ' ';
    signUpPassword.required = true;
    signUpPassword.autocomplete = 'off';

    const labelPassword = document.createElement('label');
    labelPassword.className = 'label';
    labelPassword.setAttribute('for', signUpPassword.id);
    labelPassword.textContent = 'Пароль';

    const labelPasswordPocket = document.createElement('div');
    labelPasswordPocket.className = 'label-pocket';

    const authCheckBox = document.createElement('div');
    authCheckBox.className = 'checkbox-container';

    const checkBox = document.createElement('input');
    checkBox.className = 'checkbox';
    checkBox.type = 'checkbox';
    checkBox.value = 'signup';
    checkBox.id = 'show-password-signup';

    const checkBoxLabel = document.createElement('label');
    checkBoxLabel.className = 'checkbox-label';
    checkBoxLabel.setAttribute('for', checkBox.id);
    checkBoxLabel.textContent = 'Показать пароль';

    const authButton = document.createElement('input');
    authButton.className = 'auth-button';
    authButton.id = 'signup-button';
    authButton.name = 'submit';
    authButton.type = 'button';
    authButton.value = 'Зарегистрироваться';

    const signIn = document.createElement('div');
    signIn.className = 'auth-add';
    signIn.innerHTML = '<p>Есть аккаунт? <span class="auth-button_add" data-auth="signin">ВОЙТИ</span></p>';

    authName.append(signUpName, labelName, labelNamePocket);
    authEmail.append(signUpEmail, labelEmail, labelEmailPocket);
    authPassword.append(signUpPassword, labelPassword, labelPasswordPocket);
    authCheckBox.append(checkBox, checkBoxLabel);
    signUpForm.append(authName, authEmail, authPassword, authCheckBox, authButton);
    signUpModal.append(cancel, signUpTitle, signUpForm, signIn);
    modalWindow.append(modalOverlay, signUpModal);

    document.querySelector('body')?.append(modalWindow);
  }
}

export default AuthModalView;
