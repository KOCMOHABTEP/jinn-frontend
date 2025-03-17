'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AppRoutesConfig } from '@/config/app-routes.config';
import { tryLogin } from '@/lib/redux/auth/auth.action';
import { useAppDispatch } from '@/lib/redux/store';
import styles from './Login.module.scss';

type LoginFormValues = {
  login: string;
  password: string;
};

export const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginFormValidationSchema = Yup.object().shape({
    login: Yup.string().required('Укажите логин от личного кабинета'),
    password: Yup.string()
      .required('Введите пароль')
      .min(6, 'Минимум 6 символов')
      .max(40, 'Пароль не должен превышать 40 символов'),
  });
  const loginForm = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: yupResolver(loginFormValidationSchema),
  });

  const handleLogin: SubmitHandler<LoginFormValues> = async (data) => {
    const { login, password } = data;
    try {
      await dispatch(tryLogin({ login, password })).unwrap();
      await router.push(AppRoutesConfig.HOME);
    } catch (e) {
      console.log(e);
      toast.error('Произошла ошибка');
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.containerRow}>
          <div className={styles.containerHeader}>
            <div className={styles.containerHeaderAvatar}>
              <Image
                className={styles.containerHeaderAvatarImage}
                src={'/images/user.png'}
                alt={'image'}
                width={64}
                height={64}
              />
            </div>
            <div className={styles.containerHeaderAvatarBackdrop} />
          </div>
        </div>
        <div className={styles.containerRow}>
          <div className={styles.content}>
            <div className={styles.contentHead}>
              <div className={styles.contentHeadTitle}>С возвращением!</div>
              <div className={styles.contentHeadDescription}>
                Войти в аккаунт
              </div>
            </div>

            <div className={styles.contentBody}>
              <div className={styles.contentRow}>
                <Input
                  label="Логин"
                  {...loginForm.register('login', {
                    required: 'Поле должно быть заполнено',
                  })}
                  error={loginForm.formState.errors.login?.message}
                />
              </div>
              <div className={styles.contentRow}>
                <Input
                  label="Введите пароль"
                  {...loginForm.register('password', {
                    required: 'Поле должно быть заполнено',
                  })}
                  error={loginForm.formState.errors.password?.message}
                />
              </div>
              <div className={styles.contentRow}>
                <Button
                  text="Войти"
                  onClick={loginForm.handleSubmit(handleLogin)}
                  disabled={!loginForm.formState.isValid}
                  buttonClassName={styles.contentButton}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
