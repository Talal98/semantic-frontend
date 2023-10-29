import { Box, Button, Snackbar, Typography, styled } from "@mui/material";
import { useState } from "react";
import { calculatePageRank } from "../api";
import { Node } from "reactflow";
import { updatePageRankWithName } from "../utils";
import { PageRankType } from "../typings";

const AddNodeContainer = styled(Box)`
  padding: 12px 16px;
  background-color: white;
  width: fit-content;
  border-radius: 8px;
  box-shadow: 5;
  margin-bottom: 16px;
  min-width: 320px;
`;

const ListContainer = styled(Box)`
  margin-top: 20px;
  max-height: 260px;
  overflow: auto;
`;

type PageRankProps = {
  nodes: Node[];
};

export const PageRank: React.FC<PageRankProps> = ({ nodes }) => {
  const [snackMessage, setSnackMessage] = useState("");
  const [pageRank, setPageRank] = useState<PageRankType[]>();
  const onClick = async () => {
    try {
      const response = await calculatePageRank();
      const pageRank = updatePageRankWithName(nodes, response);
      setPageRank(pageRank);
      setSnackMessage("Success: Calculated Page Rank");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setSnackMessage(`Error: ${error.message}`);
    }
  };

  return (
    <AddNodeContainer>
      <Button sx={{ height: "39px" }} variant="contained" onClick={onClick}>
        Calculate Page Rank
      </Button>
      {pageRank && (
        <ListContainer>
          {pageRank.map((item) => (
            <Typography key={item.id} variant="body1">
              {item.name ? `${item.name}: ` : ""}
              {item.pageRank}
            </Typography>
          ))}
        </ListContainer>
      )}
      <Snackbar
        open={!!snackMessage}
        autoHideDuration={1000}
        message={snackMessage}
        onClose={() => setSnackMessage("")}
      />
    </AddNodeContainer>
  );
};
