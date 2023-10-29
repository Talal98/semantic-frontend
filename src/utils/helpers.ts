import { MarkerType, Node } from "reactflow";
import { GraphNode, PageRankType } from "../typings";

const generateRandomPosition = () => ({
  x: Math.random() * 500,
  y: Math.random() * 500,
});

const generateRandomID = () => Math.floor(Math.random() * 10000).toString();

// Convert state data to the required format
export const convertDataToNodes = (data: GraphNode[]) =>
  data.map((item) => ({
    id: item.id.toString(),
    // type: "default",
    data: { label: item.name },
    position: generateRandomPosition(),
    deletable: false,
  }));

export const convertDataToEdges = (data: GraphNode[]) =>
  data.flatMap((item) =>
    item.outbound_links.map((linkId) => ({
      id: generateRandomID(),
      source: item.id.toString(),
      target: linkId.toString(),
      type: "smoothstep",
      markerEnd: { type: MarkerType.Arrow, color: "#000", width: 30, height: 30 },
    }))
  );

/// Given an array of nodes and {id, pageRank} pairs, update the nodes label with the pageRank
export const updatePageRankWithName = (
  nodes: Node[],
  pageRanks: PageRankType[]
) => {
  const updatedPageRanks = [...pageRanks];

  updatedPageRanks.forEach((pageRank) => {
    const node = nodes.find((node) => node.id === pageRank.id.toString());
    pageRank.name = node?.data.label;
  });

  updatedPageRanks.sort((a, b) => b.pageRank - a.pageRank);

  return updatedPageRanks;
};
