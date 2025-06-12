import { jwtDecode } from "jwt-decode";

class AuthService {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  saveToken(token, userData = null) {
    const now = Date.now();
    const expiryDate = now + 30 * 60 * 1000; 
    this.storage.setItem("token", token);
    this.storage.setItem("token_expiry", expiryDate.toString());
  
    if (userData) {
      this.storage.setItem("usuario_actual", JSON.stringify(userData));
    }
  }

  getUserDataFromStorage() {
    const user = this.storage.getItem("usuario_actual");
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  }

  logOut(navigate) {
    this.storage.removeItem("token");
    this.storage.removeItem("token_expiry");
    navigate("/"); 
  }

  getToken() {
    return this.storage.getItem("token");
  }

  getUserFromToken() {
    const token = this.getToken();
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded; 
    } catch (error) {
      return null; 
    }
  }

  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;

    const decoded = jwtDecode(token);
    const now = Date.now() / 1000; 
    if (decoded.exp < now) {
      this.storage.removeItem("token");
      return false; 
    }

    return true; 
  }

  getUserRole() {
    const decodedToken = this.getUserFromToken();
    if (!decodedToken) return null;

    return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
  }

}

const authService = new AuthService();
export default authService;
