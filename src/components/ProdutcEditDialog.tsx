import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Button, Dialog, DialogContent, DialogTitle, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FormEvent } from "react";


type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  categories: Category[];
  produtc?: Product;
  disabled?: boolean;
}

export const ProdutcEditDialog = ({ open, onClose, categories, onSave, disabled, produtc }: Props) => {

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(event);
  }
  return (

    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{produtc ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
      <DialogContent>
        <Box component='form' encType="multipart/form-data" onSubmit={handleFormSubmit}>
          <Box sx={{ mb: 2 }}>
            <InputLabel variant='standard' htmlFor='imgField'>Imagem</InputLabel>

            <Input
              id="imgField"
              name="imagem"
              type="file"
              fullWidth
              disabled={disabled}
              inputProps={{ accept: 'image/*' }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel variant="standard" htmlFor='nameField'>Nome</InputLabel>
            <TextField
              id="nameField"
              name="name"
              variant="standard"
              defaultValue={produtc?.name}
              required
              fullWidth
              disabled={disabled}


            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel variant='standard' htmlFor='priceField'>Price (em R$)</InputLabel>
            <TextField
              id="priceField"
              variant="standard"
              type='number'
              name="price"
              defaultValue={produtc?.price}
              required
              fullWidth
              disabled={disabled}


            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <InputLabel variant='standard' htmlFor='priceField'>Descrição</InputLabel>
            <TextField
              id="descField"
              variant="standard"
              type='number'
              name="descrição"
              defaultValue={produtc?.description}
              multiline
              rows={4}
              required
              fullWidth
              disabled={disabled}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel variant='standard' htmlFor='catField'>Categorias</InputLabel>

            <Select
              id="catField"
              variant='standard'
              name="category"
              defaultValue={produtc?.category.id || categories[0]?.id}
              required
              fullWidth
              disabled={disabled}
            >{categories.map(item => (
              <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))}</Select>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button disabled={disabled} onClick={onClose}>Cancelar</Button>
              <Button disabled={disabled} type="submit">salvar</Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog >

  );
}