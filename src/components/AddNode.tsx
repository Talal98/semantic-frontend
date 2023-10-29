import {
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { addNode, getAllNodes } from "../api";
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

const AddNodeRow = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type AddNodeProps = {
  setState: React.Dispatch<React.SetStateAction<GraphNode[] | undefined>>;
};

export const AddNode: React.FC<AddNodeProps> = ({ setState }) => {
  const [nodeName, setNodeName] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const onAddNode = async () => {
    try {
      await addNode(nodeName);
      setNodeName("");
      setSnackMessage("Success: Node added successfully");
      fetchData();
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
      <Typography variant="h6">Add Node</Typography>
      <Box sx={{ marginTop: "8px" }} />
      <AddNodeRow>
        <TextField
          size="small"
          label="Node Name"
          variant="outlined"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
        />
        <Box sx={{ margin: "0 8px" }} />
        <Button sx={{ height: "39px" }} variant="contained" onClick={onAddNode}>
          Add Node
        </Button>
      </AddNodeRow>
      <Snackbar
        open={!!snackMessage}
        autoHideDuration={1000}
        message={snackMessage}
        onClose={() => setSnackMessage("")}
      />
    </AddNodeContainer>
  );
};
