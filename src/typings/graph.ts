export type GraphNode = {
  id: number;
  name: string;
  outbound_links: number[];
  inbound_links: number[];
};

export type PageRankType = {
  id: number;
  pageRank: number;
  name?: string;
};
