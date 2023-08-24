import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Grid,
    Input,
    Typography,
    Button
} from '@mui/material';

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#B072EE',
        },
    },
});

function Usuario() {
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
                <Grid sx={{display: 'flex'}}>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '20px',
                            pt: '10px',
                            fontWeight: '700',
                        }}
                    >
                        CEP
                    </Typography>
                    <Typography
                        sx={{
                            color: 'white',
                            fontSize: '20px',
                            pt: '10px',
                            fontWeight: '700',
                            pl: '195px'
                        }}
                    >
                        Número
                    </Typography>
                </Grid>
                <Grid sx={{display: 'flex'}}>
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '200px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                    }}
                />
                <Input
                    id="filled-basic"
                    variant="filled"
                    sx={{
                        backgroundColor: '#D9D9D9',
                        borderRadius: '15px',
                        width: '200px',
                        mt: '10px',
                        fontSize: '20px',
                        height: '50px',
                        ml: '31px'
                    }}
                />
                </Grid>
                <Typography
                        sx={{
                            color: 'white',
                            fontSize: '20px',
                            pt: '10px',
                            fontWeight: '700',
                        }}
                    >
                        Telefone
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
                <Grid sx={{textAlign: 'center'}}>
                <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '199px',
                                height: '43px',
                                borderRadius: '25px',
                                fontSize: '20px',
                                fontWeight: '700',
                                mt: '25px',
                            }}
                        >
                            Cadastrae-se
                        </Button>
                </ThemeProvider>
                </Grid> 
            </Container>
        </Grid>
    );
}

export default Usuario;