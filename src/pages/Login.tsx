// import GoogleLoginButton from "../components/GoogleLoginButton";
// import { useAuth } from "../context/AuthContext";

// export const Login = () => {
//   const { signWithGoogle } = useAuth();

//   const handelLogin = async () => {
//     try {
//       await signWithGoogle();
//     } catch (_error) {}
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <header className="">
//           <h1 className="text-center text-3xl font-extrabold text-gray-900 ">DevBills</h1>
//           <p className="mt-2 text-center text-sm text-gray-600">Gerencia suas finanças simples e eficiente</p>
//         </header>

//         <main className="bg-white  mt-8 bg-whit py-8 px-4 shadow-md ronded-lg sm:px-10 spacey-y-6 ">
//           <section className="mb-6">
//             <h2 className="text-lg font-medium text-gray-900">Faça login para continiar</h2>
//             <p className="mt-1 text-sm text-gray-600">Acesse sua conta para começar a gerenciar suas finanças</p>
//           </section>

//           <GoogleLoginButton onClick={handelLogin} isLoading={false} />

//           <footer className="mt-6">
//             <p className="mt-1 text-sm gray-600 text-center">
//               Ao fazer login, concordo com nosso termos de uso e política de privacidade.
//             </p>
//           </footer>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { auth, signWithGoogle } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  if (auth.user && !auth.loading) {
    navigate("/dashboard");
  }
}, [auth.user, auth.loading, navigate]);

const handelLogin = async () => {
  try {
    await signWithGoogle();
  } catch (error) {
    console.log("Error ao fazer login", error);
  }
};;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <header className="">
          <h1 className="text-center text-3xl font-extrabold text-gray-900 ">DevBills</h1>
          <p className="mt-2 text-center text-sm text-gray-600">Gerencia suas finanças simples e eficiente</p>
        </header>

        <main className="bg-white  mt-8 bg-whit py-8 px-4 shadow-md ronded-lg sm:px-10 spacey-y-6 ">
          <section className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Faça login para continiar</h2>
            <p className="mt-1 text-sm text-gray-600">Acesse sua conta para começar a gerenciar suas finanças</p>
          </section>

          <GoogleLoginButton onClick={handelLogin} isLoading={false} />

          {auth.error && (
            <div className="bg-red-50 text-center text-red-700 mt-4 p-3 rounded-lg">
              <p>Erro ao fazer login. Tente novamente.</p>
            </div>
          )}

          <footer className="mt-6">
            <p className="mt-1 text-sm gray-600 text-center">
              Ao fazer login, concordo com nosso termos de uso e política de privacidade.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
