"use client";

import { api } from '@/libs/api';
import { Box, Alert, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import { useState, FormEvent } from 'react';

const Page = () => {

  const [Loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [passwordField2, setPasswordField2] = useState("");



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!passwordField && passwordField2) {
      setError('Prencha a Senha. ')
      return;
    }

    if (passwordField !== passwordField2) {
      setError('As Senha não São Iguais! ')
      return;
    }
    setError('');
    setInfo('');
    setLoading(true);
    const result = await api.redefinePassword(passwordField, '123');
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Senha Redefinida, Faça seu Login!");
      setPasswordField('');
      setPasswordField2('');
    }

  }


  return (
    <>
      <Typography component='p' sx={{ textAlign: 'center', mt: 2, color: '#555' }}>Olá **USUARIO**, defina sua nova senha abaixo. </Typography>

      <Box component='form' sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <TextField
          label='Digite Sua Nova Senha'
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
        <TextField
          label='Confirme Sua Nova Senha'
          name='password2'
          type='password'
          required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={e => setPasswordField2(e.target.value)}
          value={passwordField2}
          disabled={Loading}
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={Loading}
        >{Loading ? 'Carregando' : 'Definir nova Senha'}</Button>

        {error &&
          <Alert variant='filled' severity='error' sx={{ mt: 3 }}>{error}</Alert>
        }
        {info &&
          <Alert variant='filled' severity='success' sx={{ mt: 3 }}>{info}</Alert>
        }



      </Box>
    </>
  );
}


export default Page;