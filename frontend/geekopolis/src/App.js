import './App.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
function App() {
  return (
    <div className="App">
      <Grid item xs={8} sx={{mt: '1%'}}>
        <Typography variant="h3" component="h3">
            Login
        </Typography>
      </Grid>
      <Grid item xs={8} sx={{mt: '1%'}}>
        <TextField id="outlined-basic" label="Usuario" variant="outlined" sx={{ width: '400px' }}/>
      </Grid>
      <Grid item xs={8} sx={{mt: '1%'}}>
        <TextField id="outlined-basic" label="senha" variant="outlined" sx={{ width: '400px' }}/>
      </Grid>


      <Button variant="contained" color="success" sx={{mt: '1%', width: '8%'}}>Entrar</Button>

      
    </div>
  );
}

export default App;
