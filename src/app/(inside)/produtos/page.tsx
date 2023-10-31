
"use client";
import { ProductTableSkeleton } from "@/components/PorductTableSkeleton";
import { ProdutcTableItem } from "@/components/ProductTableItem";
import { ProdutcEditDialog } from "@/components/ProdutcEditDialog";
import { api } from "@/libs/api";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FormEvent } from "react";


const Page = () => {

  //As Steate do Sistemas
  const [loading, setLoading] = useState(false);

  const [products, setProdutcs] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showDeletDialog, setShowDeletDialog] = useState(false);
  const [productToDelet, setProdutcToDelete] = useState<Product>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [productToEdit, setProdutcToEdit] = useState<Product>();
  const [loadingEditDialog, setLoadingEditDialog] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    setProdutcs(await api.getProducts());
    setCategories(await api.getCategories());
    setLoading(false);


  }



  //Delete Product
  const hendleDeletProdutc = (product: Product) => {
    setProdutcToDelete(product);
    setShowDeletDialog(true);
  }
  const handleConfimeDelet = async () => {
    if (productToDelet) {
      setLoadingDelete(true);
      await api.deletProduct(productToDelet.id);
      setLoadingDelete(false);
      setShowDeletDialog(false);
      getProducts();
    }
  }


  // New/Edit Product

  const handleNewProduct = () => {
    setProdutcToEdit(undefined);
    setEditDialogOpen(true);
  }

  const hendleEditProdutc = (product: Product) => {

    setProdutcToEdit(product);
    setEditDialogOpen(true);
  }
  const handleSaveEditDialog = async (event: FormEvent<HTMLFormElement>) => {

    const form = new FormData(event.currentTarget);
    console.log(form);

    setLoadingEditDialog(true);

    if (productToEdit) {
      form.append('id', productToEdit.id.toString());
      await api.updateProdutc(form);
    } else {
      await api.createProdutc(form);
    }

    setLoadingEditDialog(false);
    setEditDialogOpen(false);
    getProducts();
  }

  return (
    <>
      <Box sx={{ my: 3 }}>

        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>

          <Typography component='h5' variant='h5' sx={{ color: '#555', mr: 2 }}> Produtos</Typography>
          <Button onClick={handleNewProduct}>Novo Produto</Button>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 50, display: { xs: 'none', md: 'table-cell' } }}>ID</TableCell>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Preço</TableCell>
              <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>Categoria</TableCell>
              <TableCell sx={{ width: { xs: 50, md: 130 } }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              <>
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
                <ProductTableSkeleton />
              </>
            }

            {!loading && products.map(item => (
              <ProdutcTableItem
                key={item.id}
                item={item}
                onEdit={hendleEditProdutc}
                onDelet={hendleDeletProdutc}
              />
            ))

            }
          </TableBody>
        </Table>

        <Dialog open={showDeletDialog} onClose={() => !loadingDelete ? setShowDeletDialog(false) : null}>
          <DialogTitle>Tem certeza que deseja deletar este Produto? </DialogTitle>
          <DialogContent>
            <DialogContentText>Não e possivel voltar após comfirma essa ação</DialogContentText>
            <Button disabled={loadingDelete} onClick={() => setShowDeletDialog(false)}>Não</Button>
            <Button disabled={loadingDelete} onClick={handleConfimeDelet}>Sim</Button>
          </DialogContent>
        </Dialog>
        <ProdutcEditDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleSaveEditDialog}
          disabled={loadingEditDialog}
          produtc={productToEdit}
          categories={categories}
        />
      </Box>

    </>
  );
}

export default Page;