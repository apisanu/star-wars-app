import { LeftHand } from '../../../../core/interfaces/IGenericDetail';
import styles from './LeftSide.module.scss';

interface Props {
  data: LeftHand;
}

const LeftSide: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.leftHand}>
      <div className={styles.leftHandCell}>{data.key}</div>
      <div className={styles.leftHandCell}>{data.value}</div>
    </div>
  );
};

export default LeftSide;
