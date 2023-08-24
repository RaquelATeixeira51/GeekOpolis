import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Button,
    Grid,
    Input,
    ThemeProvider,
    Typography,
    Box,
    Divider,
} from '@mui/material';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#B072EE',
        },
    },
});

function Login() {
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
                        pt: '100px',
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
                        pt: '30px',
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
                        color: '#FFFFFFD6',
                        fontSize: '20px',
                        pt: '20px',
                    }}
                >
                    Esqueceu a senha
                </Typography>
                <Box sx={{ textAlign: 'center', pt: '50px' }}>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '159px',
                                height: '43px',
                                borderRadius: '15px',
                                fontSize: '20px',
                                fontWeight: '700',
                            }}
                        >
                            Entrar
                        </Button>
                    </ThemeProvider>
                    <Typography
                        sx={{
                            color: 'white',
                            pt: '30px',
                            fontSize: '20px',
                            fontWeight: '700',
                        }}
                    >
                        OU
                    </Typography>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained"
                            sx={{
                                width: '159px',
                                height: '43px',
                                borderRadius: '15px',
                                fontSize: '20px',
                                fontWeight: '700',
                                mt: '25px',
                            }}
                        >
                            Cadastrar
                        </Button>
                    </ThemeProvider>
                </Box>
            </Container>
        </Grid>
    );
}

export default Login;
