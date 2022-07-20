import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      validJson: [],
      isValidJson: true,
      rowNumber: 0
    }
  }

  validateJSON = async (text) => {
    let json = typeof text !== "string"
      ? JSON.stringify(text)
      : text;
    if (!Array.isArray(json)) this.setState({ isValidJson: false })
    try {
      let jsonArray = JSON.parse(json); // Parse JSON
      let stringFinder = jsonArray.filter(element => element.length > 50)
      let numberResolver = jsonArray.filter(element => Number.isInteger(element) === false)
      if (jsonArray.length > 50 || stringFinder.length > 0 || numberResolver > 0) throw new Error("Check JSON")
      this.setState({ isValidJson: true, validJson: JSON.parse(json), rowNumber: JSON.parse(json).length })
    } catch (e) {
      this.setState({ isValidJson: false });
    }
  }

  renderTree = () => {
    const { validJson, isValidJson } = this.state;
    if (isValidJson && validJson.length > 1) {
      let sortedArray = validJson.sort((a, b) => b.weight - a.weight);
      return (
        <Grid container columnSpacing={2} borderWidth={"8px"} borderColor={"black"} borderStyle="solid">
          {sortedArray.map((item, index) => this.rowCreation({ name: item.name, weight: item.weight, value: item.value, highestWeight: sortedArray[0].weight, index }))}
        </Grid>
      )
    } else {
      return null
    }
  }

  rowCreation = ({ name, weight, value, highestWeight, index }) => {
    // Need to take into account how to add negative spacing, to add ensuring the row is satisfied in space of 12.
    const { rowNumber, validJson } = this.state;
    let size = Math.floor((weight / highestWeight) * 12)
    let valueInt = value * 100;
    if (index === validJson.length - 1) { //Attempting creation of the rows size, however... cannot take into acount number of row requested.
      return (
        <Grid item bgcolor={valueInt < 0 ? "red" : "green"} xs>
          <Box>
            <p>{name}</p>
            <p>{valueInt}% </p>
          </Box>
        </Grid>
      )
    } else {
      return (
        <Grid item bgcolor={valueInt < 0 ? "red" : "green"} xs={size}>
          <Box>
            <p>{name}</p>
            <p>{valueInt}% </p>
          </Box>
        </Grid>
      )
    }
  }

  render() {
    const { isValidJson, validJson, rowNumber } = this.state;
    return (
      <div className="App">
        <Box sx={{ flexGrow: 1 }} >
          <Grid container spacing={2} justify="center" style={{ maxWidth: '100%' }} align="center" marginTop="auto">
            <Grid item xs={12} md={6} alignItems={"center"} paddingBottom={2} bgcolor="#CFD2CF">
              <Card sx={{ minWidth: 350, maxWidth: 400 }}>
                <CardContent sx={{ minWidth: 350, maxWidth: 400 }}>
                  <h2>JSON Text Field</h2>
                  <TextField
                    width={275}
                    error={!isValidJson}
                    id="outlined-multiline-static"
                    multiline
                    rows={8}
                    value={JSON.stringify(validJson)}
                    onChange={(e) => this.validateJSON(e.target.value)}
                  />
                  <Box>
                    <h1>
                      Rows
                    </h1>
                    <TextField
                      type={"number"}
                      error={rowNumber > validJson.length}
                      id="outlined-multiline-static"
                      label="Row Number"
                      value={rowNumber}
                      onChange={(e) => {
                        if (e.target.value <= rowNumber) {
                          this.setState({ rowNumber: e.target.value })
                        } else {
                          this.setState({ rowNumber: validJson.length })
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} md={6} bgcolor={"#36454F"}>
              <Box width={"350px"}>
                <h2> Tree Map Result</h2>
                {validJson.length > 1 ? this.renderTree() : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}
