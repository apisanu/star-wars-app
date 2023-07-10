import { RightHand } from '../../../../core/interfaces/IGenericDetail';
import styles from './RightSide.module.scss';

interface Props {
  data: RightHand;
}

const RightSide: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.rightHand}>
      <div className={styles.rightHandCell}>{data.key}</div>
      <div className={styles.rightHandCell}>{data.values}</div>
    </div>
  );
};

export default RightSide;
