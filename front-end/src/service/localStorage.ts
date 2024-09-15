export interface User {
    id:number
    name: string
    email: string
    role: string
    token: string
    keepConnected:boolean
  }
  
  const LOCAL_STORAGE_KEY = 'user';
  
  const localStorageService = {
    // Salva os dados do usuário no localStorage
    setUser(user: User) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      }
    },
  
    // Retorna os dados do usuário do localStorage
    getUser(): User | null {
      if (typeof window !== 'undefined') {
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        return user ? JSON.parse(user) : null;
      }
      return null;
    },
  
    // Remove os dados do usuário do localStorage
    removeUser() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },
  
    // Verifica se o usuário está autenticado (se o token existe no localStorage)
    isAuthenticated(): boolean {
      const user = this.getUser();
      return !!user?.token;
    },
  };
  
  export default localStorageService;
  