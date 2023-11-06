import { useCallback } from "react";
import ReactFlow, {
  Node,
  Background,
  Edge,
  OnNodesChange,
  applyNodeChanges,
  OnEdgesDelete,
} from "reactflow";

import "reactflow/dist/style.css";
import { GraphNode } from "../typings";
import { addEdge, deleteEdge } from "../api";

type Props = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setState: React.Dispatch<React.SetStateAction<GraphNode[] | undefined>>;
};

export const BasicFlow: React.FC<Props> = ({
  nodes,
  setNodes,
  edges,
  setState,
}) => {
  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesDelete: OnEdgesDelete = useCallback(
    async (deletedEdges) => {
      const { source, target } = deletedEdges[0];
      const res = await deleteEdge(Number(source), Number(target));
      setState(res);
    },
    [setState]
  );

  const onConnect = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (params: any) => {
      const { source, target } = params;
      const res = await addEdge(Number(source), Number(target));
      setState(res);
    },
    [setState]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesDelete={onEdgesDelete}
      onConnect={onConnect}
      fitView
    >
      <Background />
    </ReactFlow>
  );
};
