// import { Activity, LogIn, LogOut } from "lucide-react";
// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface NavLink {
//   name: string;
//   path: string;
// }

// const Header = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const { auth, signOut } = useAuth();
//   const { pathname } = useLocation();

//   const isAuthenticated: boolean = !!auth.user;

//   const navLinks: NavLink[] = [
//     { name: "Dashboard", path: "/dashboard" },
//     { name: "Transações", path: "/transacoes" },
//   ];

//   const handleSignOut = (): void => {
//     signOut();
//   };

//   const renderAvatar = () => {
//     if (!auth.user) return null;

//     if (auth.user.photoURL) {
//       return (
//         <img
//           src={auth.user.photoURL}
//           alt={`foto de perfil do(a) ${auth.user.displayName}`}
//           className="w-8 h-8 rounded-full border border-gray-700 object-cover"
//         />
//       );
//     }

//     return (
//       <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium">
//         {auth.user.displayName?.charAt(0)}
//       </div>
//     );
//   };

//   return (
//     <header className="bg-gray-900 border-gray-700">
//       <div className="container-app">
//         <div className="flex justify-between items-center py-4">
//           <Link to="/" className="flex gap-2 text-primary-500 items-center font-bold">
//             <Activity className="h-6 w-6" />
//             DevBills
//           </Link>

//           <nav className="flex gap-6">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`text-sm font-medium transition-colors ${
//                   pathname === link.path
//                     ? "text-primary-500 bg-primary-500/10 rounded-md h-10 px-3 py-2"
//                     : "text-gray-400 h-10 px-3 py-2 hover:text-primary-500 hover:bg-primary-500/5 rounded-md"
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </nav>

//           <div className="hidden md:flex items-center space-x-4 ">
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-2">
//                 {renderAvatar()}
//                 <span className="text-sm font-medium">{auth.user?.displayName}</span>

//                 <div>
//                   <button
//                     type="button"
//                     onClick={handleSignOut}
//                     className="hover:text-red-300 hover:bg-red-500 p-2 rounded-full transition-colors cursor-pointer"
//                   >
//                     <LogOut className="text-gray-200" />
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <Link to={"/login"}>
//                 <LogIn className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all " />
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Activity, LogIn, LogOut, Menu, X } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface NavLink {
  name: string;
  path: string;
}

const Header = () => {
  const { auth, signOut } = useAuth();
  const { pathname } = useLocation();

  const isAuthenticated: boolean = !!auth.user;

  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false); // ✅ agora dentro do componente

  useEffect(() => {
    const savedAvatar = localStorage.getItem("user_avatar_preview");
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }
  }, []);

  const navLinks: NavLink[] = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" },
  ];

  const handleSignOut = (): void => {
    setIsOpen(false);
    signOut();
  };

  const changMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setAvatarPreview(imageUrl);

    localStorage.setItem("user_avatar_preview", imageUrl);
  };

  const renderAvatar = () => {
    if (!auth.user) return null;

    // Usa a foto escolhida localmente OU a foto padrão do auth.user
    const fotoParaExibir = avatarPreview || auth.user.photoURL;

    if (fotoParaExibir) {
      return (
        <label className="cursor-pointer group relative" title="Clique para trocar a foto">
          <img
            src={fotoParaExibir}
            alt={`foto de perfil do(a) ${auth.user.displayName}`}
            className="w-9 h-9 rounded-full border border-gray-700 object-cover hover:opacity-80 transition-opacity"
          />
          {/* Input escondido dentro da foto */}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      );
    }

    return (
      <label className="cursor-pointer group relative" title="Clique para trocar a foto">
        <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium hover:opacity-80 transition-opacity">
          {auth.user.displayName?.charAt(0)}
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
    );
  };

  return (
    <header className="bg-gray-900 border-gray-700">
      <div className="container-app">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex gap-2 text-primary-500 items-center font-bold">
            <Activity className="h-6 w-6" />
            DevBills
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.path
                    ? "text-primary-500 bg-primary-500/10 rounded-md h-10 px-3 py-2"
                    : "text-gray-400 h-10 px-3 py-2 hover:text-primary-500 hover:bg-primary-500/5 rounded-md"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4 ">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {renderAvatar()}
                <span className="text-sm font-medium">{auth.user?.displayName}</span>

                <div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="hover:text-red-300 hover:bg-red-500 p-2 rounded-full transition-colors cursor-pointer"
                  >
                    <LogOut className="text-gray-200" />
                  </button>
                </div>
              </div>
            ) : (
              <Link to={"/login"}>
                <LogIn className="bg-primary-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-500 transition-all " />
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="text-gray-400 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={changMenu}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div>
          <div>
            {isAuthenticated ? (
              <>
                <nav className="space-y-1">
                  {navLinks.map((links) => (
                    <Link
                      to={links.path}
                      key={links.path}
                      className={`block p-5 rounded-lg ${
                        pathname === links.path
                          ? "bg-gray-800 text-primary-500 font-medium"
                          : "text-gray-400 hover:bg-gray-800 hover:text-primary-500"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {links.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center  justify-between p-4 border-t border-gray-700">
                  <div className="flex items-center space-x-2">
                    {renderAvatar()}
                    <span>{auth.user?.displayName}</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-ptimary-500 text-gray-800 px-5 p-2.5 rounded-2xl felx items-center justify-center hover:bg-primary-600 "
                onClick={() => setIsOpen(false)}
              >
                Entra
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
