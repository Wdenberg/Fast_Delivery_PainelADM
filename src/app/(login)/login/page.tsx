"use client";

import { api } from '@/libs/api';
import { Box, Alert, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
const Page = () => {

  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!emailField || !passwordField) {
      setError('Prencha Email e Senha. ')
      return;
    }

    setError('');
    setLoading(true);
    const result = await api.login(emailField, passwordField);
    setLoading(false);
    if (result.error) {
      setError(result.error);

    }

  }


  return (
    <>
      <Typography component='p' sx={{ textAlign: 'center', mt: 2, color: '#555' }}>Digite seus Dados para Entra no Painel Administrativo do Estabelecimento para Gerenciar pordutos/pedidos</Typography>

      <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <TextField
          label='Digite Seu Email'
          name='email'
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setEmailField(e.target.value)}
          value={emailField}
          disabled={Loading}
        />
        <TextField
          label='Digite Sua Senha'
          name='password'
          type='password'
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setPasswordField(e.target.value)}
          value={passwordField}
          disabled={Loading}
        />
        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={Loading}
        >{Loading ? 'Carregando' : 'Entrar'}</Button>

        {error &&
          <Alert variant='filled' severity='error' sx={{ mt: 3 }}>{error}</Alert>
        }


        <Box sx={{ mt: 3 }}>
          <MuiLink href='/login/forgot' variant='body2' component={Link}>Esqueceu Sua Senha?</MuiLink>
        </Box>
      </Box>
    </>
  );
}


export default Page;