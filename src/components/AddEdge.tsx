import {
  Autocomplete,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { addEdge, getAllNodes } from "../api";
import { GraphNode } from "../typings";

const AddNodeContainer = styled(Box)`
  padding: 12px 16px;
  background-color: white;
  width: fit-content;
  border-radius: 8px;
  box-shadow: 5;
  margin-bottom: 16px;
  min-width: 320px;
`;

type AddEdgeProps = {
  state: GraphNode[] | undefined;
  setState: React.Dispatch<React.SetStateAction<GraphNode[] | undefined>>;
};

export const AddEdge: React.FC<AddEdgeProps> = ({ state, setState }) => {
  const [fromNode, setFromNode] = useState<GraphNode>();
  const [toNode, setToNode] = useState<GraphNode>();
  const [snackMessage, setSnackMessage] = useState("");

  const onAddEdge = async () => {
    try {
      if (fromNode && toNode) {
        await addEdge(fromNode.id, toNode.id);

        setFromNode(undefined);
        setToNode(undefined);
        setSnackMessage("Success: Edge added successfully");
        fetchData();
      } else {
        setSnackMessage("Error: Please select both nodes");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSnackMessage(`Error: ${error.message}`);
    }
  };

  const fetchData = async () => {
    try {
      const response = await getAllNodes();
      setState(response);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSnackMessage(error.message);
    }
  };
  return (
    <AddNodeContainer>
      <Typography variant="h6">Add Edge</Typography>
      <Box sx={{ marginTop: "8px" }} />
      <Autocomplete
        size="small"
        disablePortal
        options={state || []}
        getOptionLabel={(option) => option.name}
        sx={{ width: "70%" }}
        renderOption={(props, option: GraphNode) => (
          <li {...props}>{option.name}</li>
        )}
        renderInput={(params) => <TextField {...params} label="From Node" />}
        onChange={(e, value) => {
          setFromNode(value ? value : undefined);
        }}
      />
      <Box sx={{ marginTop: "12px" }} />

      <Autocomplete
        size="small"
        disablePortal
        options={state || []}
        getOptionLabel={(option) => option.name}
        sx={{ width: "70%" }}
        renderOption={(props, option: GraphNode) => (
          <li {...props}>{option.name}</li>
        )}
        renderInput={(params) => <TextField {...params} label="To Node" />}
        onChange={(e, value) => {
          setToNode(value ? value : undefined);
        }}
      />

      <Box
        sx={{
          marginTop: "16px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button sx={{ height: "39px" }} variant="contained" onClick={onAddEdge}>
          Add Edge
        </Button>
      </Box>
      <Snackbar
        open={!!snackMessage}
        autoHideDuration={1000}
        message={snackMessage}
        onClose={() => setSnackMessage("")}
      />
    </AddNodeContainer>
  );
};
