import { Box, Paper, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { GraphNode } from "./typings";
import { getAllNodes } from "./api";
import { AddEdge, AddNode, BasicFlow, PageRank } from "./components";
import { convertDataToEdges, convertDataToNodes } from "./utils";
import { Edge, Node } from "reactflow";

const Container = styled(Box)`
  margin: 10px 16px;
`;

const ContentContainer = styled(Box)`
  height: calc(100vh - 130px);
  background-color: #e0e0e0;
  padding: 16px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
`;

const GraphWrapper = styled(Box)`
  width: 70%;
  height: 100%;
  border: 1px solid;
  border-radius: 8px;
  margin-left: auto;
`;

const App = () => {
  const [state, setState] = useState<GraphNode[]>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const fetchData = async () => {
    try {
      const response = await getAllNodes();
      setState(response);
      setNodes(convertDataToNodes(response));
      setEdges(convertDataToEdges(response));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (state) {
      setNodes(convertDataToNodes(state));
      setEdges(convertDataToEdges(state));
    }
  }, [state]);

  return (
    <Container>
      <Paper sx={{ padding: "10px 16px" }}>
        <Typography variant="h6">Page Rank</Typography>
      </Paper>
      <Box sx={{ marginTop: "16px" }} />
      <ContentContainer>
        <Box>
          <AddNode setState={setState} />
          <Box sx={{ marginTop: "8px" }} />
          <AddEdge state={state} setState={setState} />
          <Box sx={{ marginTop: "8px" }} />
          <PageRank nodes={nodes} />
        </Box>

        {state && (
          <GraphWrapper>
            <BasicFlow nodes={nodes} setNodes={setNodes} edges={edges} />
          </GraphWrapper>
        )}
      </ContentContainer>
    </Container>
  );
};

export default App;
