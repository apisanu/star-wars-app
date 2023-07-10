import { useParams } from 'react-router-dom';
import DetailPanel from '../../components/organisms/DetailPanel/DetailPanel';

function Detail() {
  const { id } = useParams();
  return <DetailPanel id={id} />;
}

export default Detail;
