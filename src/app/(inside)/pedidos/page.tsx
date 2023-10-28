"use client";
import { OrderItem } from "@/components/OrderItem";
import { api } from "@/libs/api";
import { DateFormat } from "@/libs/dateFormat";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Refresh, Search } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material";
import { KeyboardEvent, useEffect, useState } from "react";


const Page = () => {

  const [serachInput, setSerachInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);
  const [printOrder, setPrintOrders] = useState<Order | null>(null);

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

  //Filtargem dos Pedidos
  useEffect(() => {
    setSerachInput('');
    setFilterOrders(orders);
  }, [orders]);

  const hendleSerachKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === 'enter' || event.code.toLowerCase() === 'numpadenter') {
      if (serachInput != '') {
        let newOrders: Order[] = [];

        for (let i in orders) {
          if (orders[i].id.toString() === serachInput) {
            newOrders.push(orders[i]);
          }
        }

        setFilterOrders(newOrders);
      } else {
        setFilterOrders(orders);
      }
    }

  }

  const handleChageStatus = async (id: number, newStatus: OrderStatus) => {
    await api.chabgeOrderStatus(id, newStatus);
    getOrders();
  }

  const handlePrintAction = (order: Order) => {
    setPrintOrders(order);
    setTimeout(() => {
      if (window) window.print();
    }, 2000)
  }
  return (

    <>
      <Box sx={{ my: 3, displayPrint: 'none' }}>
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
            onChange={e => setSerachInput(e.target.value)}
            onKeyUp={hendleSerachKey}
            placeholder="Pesquise um Pedido"
            variant="standard"
            disabled={loading}
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

          {!loading && filterOrders.map((item, index) => (
            <Grid key={index} item xs={1}>
              <OrderItem
                item={item}
                onChageStatus={handleChageStatus}
                onPrint={handlePrintAction}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'none', displayPrint: 'block' }}>
        {printOrder &&

          <>
            <Typography component='h5' variant="h5">Pedido</Typography>
            <Box>#ID: #{printOrder.id}</Box>
            <Box>Data do Pedido: {DateFormat(printOrder.orderDate)}</Box>
            <Box>Cliente: {printOrder.userName}</Box>

            <Typography component='h5' variant="h5">Pagamento</Typography>
            <Box>Tipo de Pagamento: {printOrder.shippingType === 'card' ? 'Cartão' : 'Dinheiro'}</Box>
            <Box>SubTotal: {printOrder.subtotal.toFixed(2)}</Box>
            <Box>SubTotal: {printOrder.shippingPrice.toFixed(2)}</Box>
            {printOrder.cupomDiscount && <Box>Desconto: -R${printOrder.cupomDiscount.toFixed(2)}</Box>}
            <Box>Total: {printOrder.total.toFixed(2)}</Box>

            <Typography component='h5' variant="h5">Endereço</Typography>
            <Box>Rua: {printOrder.shippingAddress.address}</Box>
            <Box>Número: {printOrder.shippingAddress.number}</Box>
            <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
            <Box>CEP: {printOrder.shippingAddress.cep}</Box>
            <Box>Bairro: {printOrder.shippingAddress.neighborhood}</Box>
            <Box>Cidade: {printOrder.shippingAddress.city}</Box>
            <Box>Estado: {printOrder.shippingAddress.state}</Box>

            <Typography component='h5' variant="h5">Itens</Typography>
            {printOrder.products.map((item, index) => (
              <Box key={index} >
                {item.qt}x {item.product.name}
              </Box>
            ))}
          </>
        }
      </Box>
    </>
  );
}

export default Page;