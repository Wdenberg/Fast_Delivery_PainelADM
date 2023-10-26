"use client";

import { api } from '@/libs/api';
import { Box, Alert, Typography, TextField, Button, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import { useState, FormEvent } from 'react';
const Page = () => {

  const [Loading, setLoading] = useState(false);
  const [info, setInfo] = useState('');
  const [error, setError] = useState("");
  const [emailField, setEmailField] = useState("");



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if (!emailField) {
      setError('Prencha Email e Senha. ')
      return;
    }

    setError('');
    setInfo('');
    setLoading(true);
    const result = await api.forgotPassword(emailField);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      setInfo("Email de recuperação Enviado!");
    }

  }


  return (
    <>
      <Typography component='p' sx={{ textAlign: 'center', mt: 2, color: '#555' }}>Deseja Recupera a senha? </Typography>

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

        <Button
          type='submit'
          variant='contained'
          fullWidth
          disabled={Loading}
        >{Loading ? 'Carregando' : 'Recuperar'}</Button>

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