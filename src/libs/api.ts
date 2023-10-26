


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
      }, 1000)
    })

  },

  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ error: '' });
      }, 1000)
    })
  }
}