import React, { useEffect, useState } from "react";

interface Props {
  id: string | undefined
}

const DetailPanel: React.FC<Props> = ({id}) => {
  console.log(id)
  return <div className="detail-panel"></div>;
};

export default DetailPanel;
