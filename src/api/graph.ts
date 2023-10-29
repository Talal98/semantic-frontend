import { GraphNode, PageRankType } from "../typings";
import { axiosClient } from "../utils";

/// Get Api
export const getAllNodes = async () => {
  try {
    const { data } = await axiosClient.get<GraphNode[]>("/graph");

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addNode = async (name: string) => {
  try {
    const { data } = await axiosClient.post<GraphNode[]>("/graph", { name });

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const addEdge = async (source: number, target: number) => {
  try {
    const { data } = await axiosClient.patch<GraphNode[]>("/graph", {
      source,
      target,
    });

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};

export const calculatePageRank = async () => {
  try {
    const { data } = await axiosClient.get<PageRankType[]>("/graph/pageRank");

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error.response.data;
  }
};
