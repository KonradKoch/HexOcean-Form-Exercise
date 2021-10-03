import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { LocalPizza } from "@mui/icons-material";
import FastfoodRoundedIcon from "@mui/icons-material/FastfoodRounded";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Stack from "@mui/material/Stack";
import { format } from "date-fns/esm";
import { Soup } from "../../icons";
import axios from "axios";

const Form = () => {
  const [selected, setSelected] = useState({
    type: "pizza",
    name: "",
    preparation_time: new Date("2018-11-21T23:00:00Z"),
    no_of_slices: "",
    diameter: "",
    dish_type: "",
    spiciness_scale: "",
    slices_of_bread: "",
    responseHandling: [],
  });

  const API = "https://frosty-wood-6558.getsandbox.com:443/dishes";
  const ApiHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const pizzaDataRequest = {
    name: selected.name !== "" ? selected.name : undefined,
    type: selected.dish_type,
    preparation_time: format(selected.preparation_time, "HH:mm:ss"),
    no_of_slices: parseInt(selected.no_of_slices),
    diameter: parseFloat(selected.diameter),
  };

  const sandwichDataRequest = {
    name: selected.name !== "" ? selected.name : undefined,
    type: selected.dish_type,
    preparation_time: format(selected.preparation_time, "HH:mm:ss"),
    slices_of_bread: parseInt(selected.slices_of_bread),
  };

  const soupDataRequest = {
    name: selected.name !== "" ? selected.name : undefined,
    type: selected.dish_type,
    preparation_time: format(selected.preparation_time, "HH:mm:ss"),
    spiciness_scale: parseInt(selected.spiciness_scale),
  };

  const HandleType = (e) => {
    setSelected({
      dish_type: e.target.value,
      name: selected.name,
      preparation_time: selected.preparation_time,
      no_of_slices: "",
      diameter: "",
      spiciness_scale: "",
      slices_of_bread: "",
    });
  };

  const HandleName = (e) => {
    setSelected({ ...selected, name: e.target.value });
  };

  const HandleTime = (date) => {
    setSelected({ ...selected, preparation_time: date });
  };

  const HandlePizzaSlices = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 0) {
      setSelected({ ...selected, no_of_slices: 0 });
    } else {
    setSelected({ ...selected, no_of_slices: value });
    }
    
  };

  const HandlePizzaDiameter = (e) => {
    const value = parseFloat(e.target.value);
    if (value <= 0) {
      setSelected({ ...selected, diameter: 0 });
    } else {
    setSelected({ ...selected, diameter: value });
    }
  };

  const HandleSoupSpiciness = (e) => {
    const value = parseInt(e.target.value);

    if (value >= 10) {
      setSelected({ ...selected, spiciness_scale: 10 });
    } else if (value <= 0) {
      setSelected({ ...selected, spiciness_scale: 0 });
    } else {
      setSelected({ ...selected, spiciness_scale: value });
    }
  };

  const HandleSandwichSlices = (e) => {
    const value = parseInt(e.target.value);
    if (value <= 0) {
      setSelected({ ...selected, slices_of_bread: 0 });
    } else {
    setSelected({ ...selected, slices_of_bread: value });
    }
    
  };

  const SendRequest = () => {
    let typeOfRequest = selected.dish_type;
    if (typeOfRequest === "pizza") {
      axios
        .post(API, pizzaDataRequest, {
          headers: ApiHeaders,
        })
        .then((data) => {
          alert(`PIZZA DATA REQUEST: ${JSON.stringify(data.data)}`);
        });
    } else if (typeOfRequest === "sandwich") {
      axios
        .post(API, sandwichDataRequest, {
          headers: ApiHeaders,
        })
        .then((data) => {
          alert(`SANDWICH DATA REQUEST: ${JSON.stringify(data.data)}`);
        });
    } else {
      axios
        .post(API, soupDataRequest, {
          headers: ApiHeaders,
        })
        .then((data) => {
          alert(`SOUP DATA REQUEST: ${JSON.stringify(data.data)}`);
        });
    }
  };

  return (
    <Box
      borderRadius={5}
      component="div"
      sx={{ p: 1, border: "1px solid grey", height: "35rem", width: "15rem" }}
    >
      <FormControl sx={{ gridGap: "0.5rem", m: 0.9, minWidth: 120 }}>
        <TextField
          style={{ margin: "1rem" }}
          defaultValue={selected.name}
          onChange={HandleName}
          variant="outlined"
          label="Dish name"
          required
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <TimePicker
              ampm={false}
              openTo="hours"
              views={["hours", "minutes", "seconds"]}
              inputFormat="HH:mm:ss"
              mask="__:__:__"
              keyboard
              label={
                "Preparation time:" +
                `${selected.preparation_time}`.slice(15, 25)
              }
              value={selected.preparation_time}
              onChange={HandleTime}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </Stack>
        </LocalizationProvider>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Dish type</InputLabel>

          <Select
            value={selected.dish_type}
            label="Dish type *"
            onChange={HandleType}
          >
            <MenuItem value="">
              <em>Select dish type</em>
            </MenuItem>
            <MenuItem value={"pizza"}>
              Pizza <LocalPizza />
            </MenuItem>
            <MenuItem value={"sandwich"}>
              Sandwich <FastfoodRoundedIcon />
            </MenuItem>
            <MenuItem value={"soup"}>Soup {Soup}</MenuItem>
          </Select>
          <FormHelperText>* fields are required</FormHelperText>
        </FormControl>

        <Box
          borderRadius={5}
          component="div"
          sx={{
            border: "1px dashed grey",
            margin: "0.5rem 0 0 0",
            width: "12rem",
            height: "auto",
            padding: "1rem",
          }}
        >
          {selected.dish_type === "pizza" ? (
            <Box>
              <TextField
                id="outlined-basic"
                type="number"
                value={selected.no_of_slices}
                onChange={HandlePizzaSlices}
                variant="outlined"
                label="# of pizza slices"
                sx={{ m: 2 }}
                required
              />
              <TextField
                variant="outlined"
                label="Pizza's diameter"
                value={selected.diameter}
                onChange={HandlePizzaDiameter}
                required
                type="number"
                sx={{ m: 2 }}
              />
            </Box>
          ) : (
            ""
          )}
          {selected.dish_type === "soup" ? (
            <TextField
              value={selected.spiciness_scale}
              onChange={HandleSoupSpiciness}
              required
              type="number"
              label="Spiciness scale (1-10)"
              sx={{ width: "80%", m: 2 }}
            />
          ) : (
            ""
          )}
          {selected.dish_type === "sandwich" ? (
            <TextField
              label="# of bread slices"
              value={selected.slices_of_bread}
              onChange={HandleSandwichSlices}
              sx={{ m: 2 }}
              required
              type="number"
            />
          ) : (
            ""
          )}
          {selected.dish_type === "" ? (
            <Box>
              <ArrowCircleUpIcon />
              <p>Please, select type first to finish the order</p>
            </Box>
          ) : (
            ""
          )}
        </Box>

        <Button
          style={{
            position: "absolute",
            top: "31.5rem",
            border: "1px dotted grey",
            borderRadius: "0.5rem",
          }}
          onClick={SendRequest}
          sx={{ color: "black" }}
        >
          Save
        </Button>
      </FormControl>
    </Box>
  );
};

export default Form;
