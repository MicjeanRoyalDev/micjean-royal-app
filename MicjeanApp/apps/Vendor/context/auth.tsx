import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "~/api/types";
import { Text, View } from "react-native";
import { ApiClient } from "~/api";
import { Login } from "~/components/LoginScreen";
import { me } from "~/api/dummy";
import LoadingScreen from "~/components/LoadingScreen";

const authClient = new ApiClient();

type AuthContextType = {
  authClient: ApiClient;
  user: User;
  error: Error | null;
  clearUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an Authenticated wrapper");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const responseInterceptor = authClient.interceptResponse((response) => {
      if (response.status === 401) {
        // This action leads to the login screen
        
        clearUser();
      }
      return response;
    });

    return () => {
      authClient.ejectResponseInterceptor(responseInterceptor);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    me()
      .then(setUser)
      .catch((err) => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const afterLogin = () => {
    setLoading(true);
    me()
      .then(setUser)
      .catch((err) => console.log("error loadind user"))
      .finally(() => setLoading(false));
  };

  const clearUser = () => {
    setUser(null);
  };

  if (!user) {
    return <Login afterLogin={afterLogin} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, error: null, clearUser, authClient }}
    >
      {children}
    </AuthContext.Provider>
  );
}
