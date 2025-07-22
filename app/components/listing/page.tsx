import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Slider, Typography } from '@mui/material';


export default function ListingPage() {
  const [age, setAge] = React.useState('');
  const [value1, setValue1] = React.useState<number[]>([20, 37]);
  
  // Dodaj jos jedan ovaj za drugi filter
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  // Function to format the value for the slider tooltip
  function valuetext(value: number) {
    return `${value}°C`;
  }

  const handleChange1 = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - 10), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + 10)]);
    }
  };
  
  return (
    <main>
        {/* Prvo idu filteri za listanje, a ispod njih su proizvodi */}
        <section>
          <Grid container rowSpacing={1} columns={{ xs: 4, sm: 2, md: 1 }} spacing={2}>

            {/* Search by name */}
            <Grid size={{ sm: 4, md: 2, lg: 1 }}>
              <TextField label="Search" variant="outlined" fullWidth />
            </Grid>

            {/* Filter by category */}
            <Grid size={{ sm: 4, md: 2, lg: 1 }}>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Kategorija</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Kategorija"
                  onChange={handleChange}
                >
                  <MenuItem value={"replike"}>replike</MenuItem>
                  <MenuItem value={"rukohvati"}>rukohvati</MenuItem>
                  <MenuItem value={"odeca"}>odeca</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ sm: 4, md: 2, lg: 1 }}>
              {/* Filter by Condition */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stanje</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Stanje"
                  onChange={handleChange}
                >
                  <MenuItem value={"novo"}>Novo</MenuItem>
                  <MenuItem value={"korisceno"}>Korišćeno</MenuItem>
                  <MenuItem value={"refurbished"}>Refurbished</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ sm: 4, md: 2, lg: 1 }}>
              {/* Filter by Price */}
              <Typography id="track-false-slider" gutterBottom>
                Cena
              </Typography>
              <Slider
                getAriaLabel={() => 'Minimum distance shift'}
                value={value1}
                onChange={handleChange1}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Grid>

          </Grid>
        </section>


        <div>
        <h1>Listing Page</h1>
        </div>
    </main>
  );
}