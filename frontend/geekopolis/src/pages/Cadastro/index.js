import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Grid,
    Input,
    Typography,
    Autocomplete,
    TextField
} from '@mui/material';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#B072EE',
        },
    },
});

const options = ['Option 1', 'Option 2'];

function Cadastro() {
    const [value, setValue] = React.useState(options[0]);
    const [inputValue, setInputValue] = React.useState('');
    return (
        <Grid sx={{ bgcolor: '#0C0C0C', padding: 20 }}>
            <Container
                sx={{
                    width: '487px',
                    height: '644px',
                    backgroundColor: '#28044D',
                    borderRadius: '40px',
                }}
            >
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        pt: '30px',
                        fontWeight: '700'
                    }}
                >
                    E-mail
                </Typography>
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '437px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                    }}
                />
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        pt: '10px',
                        fontWeight: '700',
                    }}
                >
                    Senha
                </Typography>
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '437px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                    }}
                />
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        pt: '10px',
                        fontWeight: '700',
                    }}
                >
                    Confirmar Senha
                </Typography>
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '437px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                    }}
                />
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: '20px',
                        pt: '10px',
                        fontWeight: '700',
                    }}
                >
                    CPF
                </Typography>
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '437px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                    }}
                />
                <div>
                    <br />
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Controllable" />}
                    />
                    </div>
            </Container>
        </Grid>
    );
}

export default Cadastro;