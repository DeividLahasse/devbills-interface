import { signOut as firebaseSignOut, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { firebaseAuth, googleAutoProvider } from "../config/firebase";
import type { AuthState } from "../types/auth";

interface AuthContextProps {
  auth: AuthState;
  signWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      (user) => {

        console.log(user)
        if (user) {
          setAuthState({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            error: null,
            loading: false,
          });
        } else {
          setAuthState({ user: null, error: null, loading: false });
        }
      },
      (error) => {
        console.error("Error na autenticação", error);
        setAuthState({ user: null, error: error.message, loading: false });
      },
    );

    return () => unsubscribe();
  }, []);

  const signWithGoogle = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      await signInWithPopup(firebaseAuth, googleAutoProvider);
    } catch (err) {
  console.error("ERRO COMPLETO DO LOGIN:", err);
  const message = err instanceof Error ? err.message : "Erro ao tentar logar";
  setAuthState((prev) => ({ ...prev, loading: false, error: message }));
}
  };

  const signOut = async (): Promise<void> => {
    setAuthState((prev) => ({ ...prev, loading: true }));
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao tentar loga";

      setAuthState((prev) => ({ ...prev, loading: false, error: message }));
    }
  };

  return <AuthContext value={{ auth: authState, signWithGoogle, signOut }}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado denro de um AuthProvider");
  }

  return context;
};

// import { signOut as firebaseSignOut, getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
// import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
// import { firebaseAuth, googleAutoProvider } from "../config/firebase";
// import type { AuthState } from "../types/auth";

// interface AuthContextProps {
//   user: any;
//   auth: AuthState;
//   signWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     error: null,
//     loading: true,
//   });

//   useEffect(() => {
//     getRedirectResult(firebaseAuth)
//       .then((result) => {
//         console.log("Redirect result:", result);
//       })
//       .catch((error) => {
//         console.error("Redirect error:", error);
//       });

//     const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
//       console.log("onAuthStateChanged user:", user);
//       setAuthState({
//         user: user
//           ? {
//               uid: user.uid,
//               displayName: user.displayName,
//               email: user.email,
//               photoURL: user.photoURL,
//             }
//           : null,
//         error: null,
//         loading: false,
//       });
//     });

//     return () => unsubscribe();
//   }, []);

//   const signWithGoogle = async (): Promise<void> => {
//     try {
//       await signInWithRedirect(firebaseAuth, googleAutoProvider);
//     } catch (error) {
//       console.error("Erro no login:", error);
//     }
//   };

//   const signOut = async (): Promise<void> => {
//     try {
//       await firebaseSignOut(firebaseAuth);
//     } catch (error) {
//       console.error("Erro no logout:", error);
//     }
//   };

//   return <AuthContext value={{ auth: authState, signWithGoogle, signOut }}>{children}</AuthContext>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth deve ser usado dentro de um AuthProvider");
//   }

//   return context;
// };
