import { Category } from "@/types/Category";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";
import { Product } from "@/types/Product";




const tmpProduct: Product = {
  id: 25,
  image: 'https://saopaulosecreto.com/wp-content/uploads/2022/10/Get-Burger-1024x683.jpg',
  category: {
    id: 88,
    name: "Burguers",

  },
  name: "Burgão Guloso",
  price: 35.3,
  description: "Um Buerger Guloso que Você adora! "
}
export const api = {
  login: async (email: string, password: string): Promise<{ error: string, token?: string }> => {

    return new Promise(resolve => {
      setTimeout(() => {
        if (email !== 'wdenberg42@gmail.com') {
          resolve({
            error: 'Email e/ou Password Errado.'
          });
        } else {
          resolve({
            error: '',
            token: '123'
          });
        }
      }, 1000);
    })

  },

  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: '' });
      }, 1000)
    })
  },

  redefinePassword: async (Password: string, token: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: '' });
      }, 1000);
    });
  },

  getOrders: async (): Promise<Order[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const orders: Order[] = [];
        const statuses: OrderStatus[] = ['preparing', 'sent', 'delivered'];

        // TODO: Monta do array de pedidos
        for (let i = 0; i < 6; i++) {
          orders.push({
            id:
              parseInt('12' + i),
            status: statuses[Math.floor(Math.random() * 3)],
            orderDate: '2023-10-10 18: 30',
            userid: '1',
            userName: 'Eduardo Dandara',
            shippingAddress: {
              id: 88,
              cep: '53417-020',
              address: 'Rua das Bichas',
              number: '24',
              neighborhood: 'Bonecas',
              city: 'LGBT',
              state: 'PT',
              complement: 'Queima'

            },
            shippingPrice: 24,
            shippingType: 'card',
            changeValue: 0,
            cupom: 'LULA',
            cupomDiscount: 4,
            products: [

              { qt: 2, product: tmpProduct },
              { qt: 3, product: { ...tmpProduct, id: 88, name: 'Burger Vergano' } }
            ],
            subtotal: 99,
            total: 120

          });
        }
        resolve(orders);
      }, 1000);
    });
  },
  chabgeOrderStatus: async (id: number, newStatus: OrderStatus) => {
    return true;
  },


  getProducts: async (): Promise<Product[]> => {
    const list: Product[] = [
      { ...tmpProduct, id: 1 },
      { ...tmpProduct, id: 2 },
      { ...tmpProduct, id: 3 },
      { ...tmpProduct, id: 4 },
      { ...tmpProduct, id: 5 },
      { ...tmpProduct, id: 6 },
      { ...tmpProduct, id: 7 },
      { ...tmpProduct, id: 8 },
      { ...tmpProduct, id: 9 },
      { ...tmpProduct, id: 10 }
    ];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list);
      }, 200);
    })
  },

  getCategories: async (): Promise<Category[]> => {
    const list: Category[] = [
      { id: 99, name: 'Burgues' },
      { id: 88, name: 'Refigerantes' },
      { id: 97, name: 'Doces' }
    ];

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(list);
      }, 200);
    })
  },

  deletProduct: async (id: number): Promise<boolean> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    })
  },

  createProdutc: async (form: FormData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    })
  },

  updateProdutc: async (form: FormData) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    })
  }

}