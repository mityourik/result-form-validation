import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './App.module.css';

export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const buttonRef = useRef(null);

    const validate = useCallback(() => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (touched.email && !emailRegex.test(email))
            newErrors.email = 'Некорректный email';
        if (touched.password && password.length < 6)
            newErrors.password = 'Минимум 6 символов';
        if (touched.confirmPassword && confirmPassword !== password)
            newErrors.confirmPassword = 'Пароли должны совпадать';

        setErrors(newErrors);
        setIsValid(
            emailRegex.test(email) &&
                password.length >= 6 &&
                confirmPassword === password
        );
    }, [email, password, confirmPassword, touched]);

    useEffect(() => {
        validate();
    }, [validate]);

    useEffect(() => {
        if (isValid) buttonRef.current?.focus();
    }, [isValid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValid) {
            console.log({ email, password, confirmPassword });
        }
    };

    const handleChange = (field, value) => {
        if (!touched[field]) {
            setTouched((prev) => ({ ...prev, [field]: true }));
        }

        if (field === 'email') setEmail(value);
        if (field === 'password') setPassword(value);
        if (field === 'confirmPassword') setConfirmPassword(value);
    };

    return (
        <div className={styles.form}>
            <form className={styles.form__container} onSubmit={handleSubmit}>
                <h2 className={styles.form__title}>Регистрация</h2>

                <div className={styles.form__field}>
                    <input
                        className={styles.form__input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                    <div className={styles.form__error}>
                        {errors.email || '\u00A0'}
                    </div>
                </div>

                <div className={styles.form__field}>
                    <input
                        className={styles.form__input}
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) =>
                            handleChange('password', e.target.value)
                        }
                    />
                    <div className={styles.form__error}>
                        {errors.password || '\u00A0'}
                    </div>
                </div>

                <div className={styles.form__field}>
                    <input
                        className={styles.form__input}
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) =>
                            handleChange('confirmPassword', e.target.value)
                        }
                    />
                    <div className={styles.form__error}>
                        {errors.confirmPassword || '\u00A0'}
                    </div>
                </div>

                <button
                    ref={buttonRef}
                    className={`${styles.form__button} ${
                        !isValid ? styles.form__button_disabled : ''
                    }`}
                    type="submit"
                    disabled={!isValid}
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
}
