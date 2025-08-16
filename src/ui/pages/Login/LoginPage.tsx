import { useState } from 'react';
import RoundInput from '../../components/RoundInput/RoundInput';
import styles from './LoginPage.module.scss';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { userLogin } from '../../services/user/user-service';

const LoginPage = () => {
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

    if (!response.success) {
      alert(response.message);
      return;
    }

    alert('logado!')
  };

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