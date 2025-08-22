"use client";
import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client"; // Đảm bảo đường dẫn này chính xác

export default function Page() {
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // --- State cho form ---
  // Đăng nhập
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Đăng ký
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // --- State cho loading và thông báo lỗi ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // --- Xóa thông báo lỗi/thành công khi chuyển tab ---
  const toggleForm = (active: boolean) => {
    setIsActive(active);
    setError(null);
    setMessage(null);
  };

  // --- Hàm xử lý Đăng ký ---
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            display_name: registerName,
          },
        },
      });

      if (error) throw error;

      // Kiểm tra xem người dùng có cần xác thực email không
      if (data.user && !data.user.email_confirmed_at) {
        setMessage("Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.");
      } else {
        setMessage("Đăng ký thành công! Đang chuyển hướng...");
        router.push("/"); // Chuyển hướng đến trang chủ hoặc dashboard
        router.refresh();
      }
    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      let errorMessage = "Đã xảy ra lỗi khi đăng ký.";
      if (error.message.includes("User already registered")) {
        errorMessage = "Email này đã được đăng ký. Vui lòng sử dụng email khác.";
      } else if (error.message.includes("Password should be at least 6 characters")) {
        errorMessage = "Mật khẩu phải có ít nhất 6 ký tự.";
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Hàm xử lý Đăng nhập ---
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) throw error;

      router.push("/"); // Chuyển hướng đến trang chủ hoặc dashboard
      router.refresh();

    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error);
      setError("Email hoặc mật khẩu không chính xác.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Hàm xử lý đăng nhập qua Mạng xã hội (OAuth) ---
  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'github' | 'linkedin') => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`, // URL callback sau khi đăng nhập thành công
      },
    });

    if (error) {
      setError(`Lỗi khi đăng nhập bằng ${provider}: ${error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-50 to-green-100">
      <div
        className={`relative w-[850px] h-auto min-h-[550px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700`}
      >
        {/* FORM LOGIN */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex items-center text-center p-10 transition-all duration-700 z-20 ${
            isActive
              ? "translate-x-[-100%] opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100 pointer-events-auto"
          }`}
        >
          <form className="w-full" onSubmit={handleSignIn}>
            <h1 className="text-3xl font-bold mb-4 text-green-800">Đăng nhập</h1>
            
            {/* Vùng hiển thị thông báo */}
            {error && !isActive && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">{error}</p>}
            {message && !isActive && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md mb-4">{message}</p>}

            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-5 py-3 pr-12 bg-green-50 rounded-lg outline-none text-gray-700"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <i className="bx bxs-envelope absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-700"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Mật khẩu"
                required
                className="w-full px-5 py-3 pr-12 bg-green-50 rounded-lg outline-none text-gray-700"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-700"></i>
            </div>
            <div className="text-sm mb-4 text-right">
              <a href="#" className="text-green-700 hover:underline">
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
            <p className="my-4">hoặc đăng nhập bằng</p>
            <div className="flex justify-center gap-3">
              <button type="button" onClick={() => handleOAuthSignIn('google')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-google"></i>
              </button>
              <button type="button" onClick={() => handleOAuthSignIn('facebook')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-facebook"></i>
              </button>
              <button type="button" onClick={() => handleOAuthSignIn('github')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-github"></i>
              </button>
            </div>
          </form>
        </div>

        {/* FORM REGISTER */}
        <div
          className={`absolute top-0 right-0 w-1/2 h-full flex items-center text-center p-10 transition-all duration-700 z-20 ${
            isActive
              ? "translate-x-[-100%] opacity-100 pointer-events-auto"
              : "translate-x-full opacity-0 pointer-events-none"
          }`}
        >
          <form className="w-full" onSubmit={handleSignUp}>
            <h1 className="text-3xl font-bold mb-4 text-green-800">Đăng ký</h1>
            
            {/* Vùng hiển thị thông báo */}
            {error && isActive && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">{error}</p>}
            {message && isActive && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-md mb-4">{message}</p>}

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Tên hiển thị"
                required
                className="w-full px-5 py-3 pr-12 bg-green-50 rounded-lg outline-none text-gray-700"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
              <i className="bx bxs-user absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-700"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-5 py-3 pr-12 bg-green-50 rounded-lg outline-none text-gray-700"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <i className="bx bxs-envelope absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-700"></i>
            </div>
            <div className="relative mb-6">
              <input
                type="password"
                placeholder="Mật khẩu"
                required
                className="w-full px-5 py-3 pr-12 bg-green-50 rounded-lg outline-none text-gray-700"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt absolute right-4 top-1/2 -translate-y-1/2 text-xl text-green-700"></i>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition disabled:opacity-50"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
            <p className="my-4">hoặc đăng ký bằng</p>
             <div className="flex justify-center gap-3">
              <button type="button" onClick={() => handleOAuthSignIn('google')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-google"></i>
              </button>
              <button type="button" onClick={() => handleOAuthSignIn('facebook')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-facebook"></i>
              </button>
              <button type="button" onClick={() => handleOAuthSignIn('github')} className="p-2 border-2 border-green-200 rounded-lg text-xl text-green-700 hover:bg-green-50">
                <i className="bx bxl-github"></i>
              </button>
            </div>
          </form>
        </div>

        {/* TOGGLE PANEL */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div
            className={`absolute top-0 left-0 w-1/2 h-full flex flex-col justify-center items-center text-white p-10 text-center transition-all duration-700 bg-green-700 ${isActive ? "-translate-x-full" : "translate-x-0"
              }`}
          >
            <h1 className="text-3xl font-bold mb-3">Chào mừng trở lại!</h1>
            <p className="mb-6">Bạn chưa có tài khoản? Hãy đăng ký để kết nối.</p>
            <button
              className="w-40 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-700 transition"
              onClick={() => toggleForm(true)}
            >
              Đăng ký
            </button>
          </div>

          <div
            className={`absolute top-0 right-0 w-1/2 h-full flex flex-col justify-center items-center text-white p-10 text-center transition-all duration-700 bg-green-700 ${isActive ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <h1 className="text-3xl font-bold mb-3">Xin chào!</h1>
            <p className="mb-6">Bạn đã có tài khoản? Đăng nhập ngay.</p>
            <button
              className="w-40 py-2 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-700 transition"
              onClick={() => toggleForm(false)}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}