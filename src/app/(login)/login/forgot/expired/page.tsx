
"use client";


import { Alert, Link as MuiLink } from '@mui/material';
import Link from 'next/link';


const Page = () => {



  return (
    <>
      <Alert variant='filled' severity='error' sx={{ mt: 3 }}>Esse Link Expirou, Tente novamente! </Alert>
      <MuiLink href="/login/forgot" component={Link} variant='button' sx={{ mt: 3 }}>Esqueci minha Senha</MuiLink>
    </>
  );
}


export default Page;