"use client";
import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";


const Page = () => {

  const [serachInput, setSerachInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const getOrders = async () => {
    // Limpa o campo de pesquisa
    setSerachInput('');

    // Seta como o Arrey do Pedidos Vazio
    setOrders([]);

    // seta o Loading pra aparecer os Skeleton do grid
    setLoading(true);

    // Pegando da Api
    const orderList: Order[] = await api.getOrders();

    // setando a Lista de pedidos
    setOrders(orderList);
    // seta o loading como falso(Retira o Loading e Skeleton do grid some)
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, []);


  const hendleSerachInput = () => {

  }

  const hendleSerachKey = () => {

  }

  const handleChageStatus = async (id: number, newStatus: OrderStatus) => {
    await api.chabgeOrderStatus(id, newStatus);
    getOrders();
  }
  return (

    <Box sx={{ my: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component='h5' variant="h5" sx={{ color: '#555', mr: 2 }}>Pedidos</Typography>
          {loading && <CircularProgress size={24} />}
          {!loading &&
            <Button onClick={getOrders} size="small" sx={{ justifyContent: { xs: 'flex-start', md: 'center' } }}>
              <Refresh />
              <Typography component='div' sx={{ color: '#555', display: { xs: 'none', sm: 'block' } }}>Atualizar</Typography>
            </Button>
          }
        </Box>

        <TextField
          value={serachInput}
          onChange={hendleSerachInput}
          onKeyUp={hendleSerachKey}
          placeholder="Pesquise um Pedido"
          variant="standard"
          disabled
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            )
          }}
        />
      </Box>

      <Grid container spacing={3} columns={{ xs: 1, sm: 3, md: 4 }}>

        {loading &&
          <>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>
            <Grid item xs={1}>
              <Skeleton variant="rectangular" height={220} />
            </Grid>

          </>
        }

        {!loading && orders.map((item, index) => (
          <Grid item xs={1}>
            <OrderItem
              item={item}
              onChageStatus={handleChageStatus}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Page;