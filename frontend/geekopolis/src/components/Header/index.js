import * as React from 'react';
import { Button, Grid } from '@mui/material';
import logo from '../../assets/img/GeekOpolisWhite.png';

function Header() {
  return (
    <Grid sx={{ bgcolor: '#28044D', display: 'flex' }}>
      <Grid
        sx={{ ml: '20px', padding: '15px', justifyContent: 'space-between' }}
      >
        <img src={logo} width={'333px'} height={'92px'} />
      </Grid>
      <Button sx={{ ml: '300px', color: 'white', fontWeight: 700 }}>
        Vestuário
      </Button>
      <Button sx={{ ml: '150px', color: 'white', fontWeight: 700 }}>
        Acessórios
      </Button>
      <Button sx={{ ml: '150px', color: 'white', fontWeight: 700 }}>
        Gamer
      </Button>
      <Button sx={{ ml: '150px', color: 'white', fontWeight: 700 }}>
        Funkos
      </Button>
    </Grid>
  );
}

export default Header;
