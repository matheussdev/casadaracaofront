import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import api from "../services/api";
import { setLogin } from "../services/auth";
import { User } from "../types";
import { errorActions } from "../utils/errorActions";

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

interface LoginParams {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  login: (params: LoginParams) => Promise<LoginResponse>;
  loadingUserData: boolean;
  initialGet: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(false);

  const getUser = useCallback(async (): Promise<User> => {
    return new Promise<User>((resolve, reject) => {
      api
        .get("v1/auth/client")
        .then((response) => {
          setUser(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          errorActions(error)
          reject(error.response.data.error || "Erro ao buscar usuário!");
        })
        .finally(() => {
          setLoadingUserData(false);
        });
    });
  }, []);

  const initialGet = useCallback(async () => {
    setLoadingUserData(true);
    getUser();
  }, [getUser]);

  const login = useCallback(
    async (params: LoginParams): Promise<LoginResponse> => {
      return new Promise<LoginResponse>((resolve, reject) => {
        api
          .post(`/auth/login`, params)
          .then((response) => {
            setLogin(response.data.access_token);
            localStorage.setItem("@casa_da_racao_user", JSON.stringify({
              name: response.data.name,
              cpf : response.data.cgc_cpf,
            }));
            setUser(response.data.user);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error?.response?.data.detail || "Erro ao logar!");
          });
      });
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loadingUserData,
        initialGet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
