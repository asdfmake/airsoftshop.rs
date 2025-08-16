"use client";

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Slider, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';


export default function ListingFilters({SearchParams}: {SearchParams: string}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = React.useState<string>(searchParams.get('search') || '');
  const [category, setCategory] = React.useState<string>(searchParams.get('category') || '');
  const [condition, setCondition] = React.useState<string>(searchParams.get('condition') || '');
  const [priceRange, setPriceRange] = React.useState<number[]>([
    Number(searchParams.get('priceMin')) || 0,
    Number(searchParams.get('priceMax')) || 10000,
  ]);

  let filteri = {
    search: search,
    kategorija: category,
    stanje: condition,
    cena: {min: priceRange[0], max: priceRange[1]},
  }

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

  const handleSearch = () => {
    console.log("Searching with filters:", filteri);
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set('search', search);
    else params.delete('search');
    if (category) params.set('category', category);
    else params.delete('category');
    if (condition) params.set('condition', condition);
    else params.delete('condition');
    if (priceRange[0] > 0) params.set('priceMin', priceRange[0].toString());
    else params.delete('priceMin');
    if (priceRange[1] < 10000) params.set('priceMax', priceRange[1].toString());
    else params.delete('priceMax');

    router.push(`?${params.toString()}`);
  };

  const resetSearch = () => {
    setSearch('');
    setCategory('');
    setCondition('');
    setPriceRange([0, 10000]);

    router.push(`/`);
  };

  return (
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
              <TextField 
                value={search}
                label="Search" 
                variant="outlined" 
                fullWidth 
                onChange={(e) => setSearch(e.target.value)} 
              />
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
                  <MenuItem value=""><em>Kategorija</em></MenuItem>
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
                  <MenuItem value=""><em>Stanje</em></MenuItem>
                  <MenuItem value={"NEW"}>Novo</MenuItem>
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
              <Button variant="contained" color="primary" size='large' onClick={handleSearch}>
                Pretrazi
              </Button>
              <Button variant="contained" color="error" size='large' onClick={resetSearch} sx={{ margin: "20px 40px" }}>
                Resetuj filtere
              </Button>
            </Grid>

          </Grid>
        </section>
  )
}