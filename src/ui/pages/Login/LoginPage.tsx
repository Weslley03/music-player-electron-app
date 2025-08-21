import { useEffect, useState } from 'react';
import RoundInput from '../../components/RoundInput/RoundInput';
import styles from './LoginPage.module.scss';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { userLogin } from '../../services/user/user-service';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { updateUser, updateUserToken } from '../../reducers/userReducer';

const LoginPage = () => {
  const { createToastify } = useToast();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  let redirectTimeoutId;

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleChangeFormData = (field: 'email' | 'password', value: string) => {
    setLoginFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const allComplete = Object.values(loginFormData).every(values => values.trim() !== '');
    if (!allComplete) return;

    const response = await userLogin(loginFormData.email, loginFormData.password);

    if (!response.success || !response.user) {
      createToastify(response.message, 'error');
      return;
    }

    createToastify('usuário logado com sucesso!', 'success');

    setTimeout(() => {
      dispatch(updateUserToken(response.token ?? ''));
      dispatch(updateUser(response.user));
      console.log('user', response.user)

      if (response.user.firstAccess) {
        navigate('/welcome')
        return;
      }

      navigate('/')
    }, 2000)
  };

  useEffect(() => {
    return () => clearTimeout(redirectTimeoutId);
  }, [redirectTimeoutId]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>

        <div className={styles.inputSection}>
          <span> email </span>
          <RoundInput
            showXIcon={false}
            value={loginFormData.email}
            onChange={(value: string) => handleChangeFormData('email', value)}
          />
        </div>

        <div className={styles.inputSection}>
          <span> password </span>
          <RoundInput
            type='password'
            showXIcon={false}
            value={loginFormData.password}
            onChange={(value: string) => handleChangeFormData('password', value)}
          />
        </div>

        <div className={styles.buttonSection}>
          <DefaultButton text='acessar' onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;