import Box from "@mui/material/Box";

import Form from "./Components/Form/Form";
import LocalPizzaRoundedIcon from "@mui/icons-material/LocalPizzaRounded";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import { Soup } from "./icons";

function App() {
  return (
    <>
      <center style={{ margin: "1rem 0 0 0" }}>
        <Box
          borderRadius={5}
          component="div"
          sx={{
            p: 0.5,
            border: "1px solid grey",
            height: "auto",
            width: "20rem",
          }}
        >
          <LocalPizzaRoundedIcon />
          <FastfoodRoundedIcon />
          {Soup}
          <Form />
        </Box>
      </center>
    </>
  );
}

export default App;
