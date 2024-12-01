import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loader}>
      <Oval height={80} width={80} color="blue" />
    </div>
  );
}
