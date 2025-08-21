import { useNavigate } from 'react-router-dom';
import RoundBottom from '../../components/RoundBottom/RoundBottom';
import { useAppSelector } from '../../hooks/redux-hooks';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { avatar } = useAppSelector(state => state.user);

  const back = () => {
    navigate('/');
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.upScale} onClick={() => back()}>
          <span> spotify-icon </span>
        </div>

        <div className={styles.userSection}>
          <RoundBottom>
            <img className={styles.userImage} src={`data:image/jpeg;base64,${avatar}`} />
          </RoundBottom>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.options}>
          <div className={`${styles.box} ${styles.plan} ${styles.changeBackground}`}>
            <div className={`${styles.planSection} ${styles.upScale}`}>
              <span> plan: </span>
              <span> dev </span>
            </div>
          </div>
          <div className={`${styles.box} ${styles.edit} ${styles.changeBackground}`}>
            <span className={styles.upScale}>{'<edit profile />'}</span>
          </div>
          <div className={`${styles.box} ${styles.pix} ${styles.changeBackground}`}>
            <span className={styles.upScale}> send pix to dev </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;