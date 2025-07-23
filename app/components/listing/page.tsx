import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Slider, Typography } from '@mui/material';


export default function ListingPage() {
  const [category, setCategory] = React.useState<string>("");
  const [condition, setCondition] = React.useState<string>("");
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 10000]);

  let filteri = {
    search: '',
    kategorija: category,
    stanje: condition,
    cena: {min: 0, max: 1000},
  }
  console.log(filteri);
  const updateCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const updateCondition = (event: SelectChangeEvent) => {
    setCondition(event.target.value as string);
  };


  // Function to format the value for the slider tooltip
  function valuetext(value: number) {
    return `${value}€`;
  }

  const updatePriceRange = (event: Event, newValue: number[], activeThumb: number) => {
    if (activeThumb === 0) {
      setPriceRange([Math.min(newValue[0], priceRange[1] - 10), priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + 10)]);
    }
  };
  
  return (
    <main>
        {/* Prvo idu filteri za listanje, a ispod njih su proizvodi */}
        <section>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ width: '100%', textAlign: 'center', padding: 2}}
          >
            Filteri 
          </Typography>
          <Grid container rowSpacing={1} spacing={2}>

            {/* Search by name */}
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
              <TextField label="Search" variant="outlined" fullWidth />
            </Grid>

            {/* Filter by category */}
            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
              
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Kategorija</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Kategorija"
                  onChange={updateCategory}
                >
                  <MenuItem value={"replike"}>replike</MenuItem>
                  <MenuItem value={"rukohvati"}>rukohvati</MenuItem>
                  <MenuItem value={"odeca"}>odeca</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
              {/* Filter by Condition */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Stanje</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={condition}
                  label="Stanje"
                  onChange={updateCondition}
                >
                  <MenuItem value={"novo"}>Novo</MenuItem>
                  <MenuItem value={"korisceno"}>Korišćeno</MenuItem>
                  <MenuItem value={"refurbished"}>Refurbished</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
              {/* Filter by Price */}
              <Box sx={{ width: '80%', margin: '0 auto' }}>
                <Typography id="track-false-slider" gutterBottom>
                  Cena
                </Typography>
                <Slider
                  getAriaLabel={() => 'Minimum distance shift'}
                  value={priceRange}
                  onChange={updatePriceRange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                  disableSwap
                />
              </Box>
            </Grid>

            <Grid size={12} sx={{textAlign: 'center'}}>
              <Button variant="contained" color="primary" size='large'>
                Pretrazi
              </Button>
            </Grid>

          </Grid>
        </section>


        <div>
        <h1>Listing Page</h1>
        </div>
    </main>
  );
}