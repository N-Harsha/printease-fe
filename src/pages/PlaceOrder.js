import { Box, Button, Input, Typography } from "@material-ui/core";
import { useEffect } from "react";

function PlaceOrder() {
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    console.log(selectedFile);
  }, [selectedFile]);
  return (
    <>
      {selectedFile === null ? (
        <Box>
          <Button variant="contained">Upload A file</Button>
        </Box>
      ) : (
        <Box>{selectedFile.name}</Box>
      )}
    </>
  );
}

export default PlaceOrder;
