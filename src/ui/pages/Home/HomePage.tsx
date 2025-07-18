import GenericLayout from "../../layouts/GenericLayout";
import styles from './HomePage.module.scss';

const HomePage = () => {
  return (
    <GenericLayout>
      <div className={styles.mainContainer}>
        <p> HomePage! </p>
      </div>
    </GenericLayout>
  )
};

export default HomePage;