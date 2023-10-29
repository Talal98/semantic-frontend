import { useCallback } from "react";
import ReactFlow, {
  Node,
  Background,
  Edge,
  OnNodesChange,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";

type Props = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
};

export const BasicFlow: React.FC<Props> = ({ nodes, setNodes, edges }) => {
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      fitView
    >
      <Background />
    </ReactFlow>
  );
};
