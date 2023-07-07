import { useParams } from "react-router-dom";
import DetailPanel from "../../components/organisms/DetailPanel/DetailPanel";

function Detail() {
  const { id } = useParams();
  return <div className="dashboard">
    <DetailPanel id={id}/>
  </div>;
}

export default Detail;
