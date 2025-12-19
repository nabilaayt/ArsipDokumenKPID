import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    
    return(
        <section id="login" className="font-poppins min-h-screen flex items-center py-8">
            <div className="w-full flex flex-col lg:flex-row items-center gap-10">

                {/* SECTION FORM */}
                <div className="w-full lg:w-1/2 px-6 lg:px-16">
                    <div className="max-w-xl mx-auto lg:ml-auto flex flex-col gap-8">
                        <div className="flex flex-row gap-5 items-center mb-20">
                            <img 
                                src="/assets/logo/logoKPID.png" 
                                className="w-20 h-20"
                            />
                            <p className="text-gray-950 text-xl font-medium">Komisi Penyiaran Indonesia Daerah Sumatera Selatan</p>
                        </div>
                        <div className="flex flex-col gap-5">
                            <h1 className="text-4xl font-semibold text-gray-950 ">Log In</h1>
                            <p className="text-lg text-gray-500">Masukkan alamat email dan kata sandi untuk masuk ke akun Anda.</p>
                        </div>
                        <form action="" className="flex flex-col gap-6 sm:gap-8 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <label htmlFor="email" className="text-xl font-medium text-gray-950">Email</label>
                                <input 
                                    type="text" 
                                    id="email"
                                    // value={}
                                    // onChange={}
                                    placeholder="Masukkan email"
                                    className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <label htmlFor="password" className="text-xl font-medium text-gray-950">Kata Sandi</label>
                                <input 
                                    type="password" 
                                    id="password"
                                    // value={}
                                    // onChange={}
                                    placeholder="Masukkan kata sandi"
                                    className="w-full rounded-xl px-5 py-3 text-lg text-gray-500 bg-babyBlue focus:outline-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-red text-white text-xl rounded-xl px-5 py-3 w-full mt-10 hover:scale-[1.02] transition-transform cursor-pointer"
                            >
                                Log In
                            </button>
                        </form>
                    </div>
                </div>

                {/* SECTION HERO */}
                <div className="hidden lg:block w-2/3 h-full relative px-6 lg:px-18">
                    <img 
                        src="/assets/heroLogin.png" 
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-10 left-22 max-w-2xl p-8 rounded-2xl items-center bg-white/20 backdrop-blur-lg">
                        <h1 className="text-white text-3xl font-semibold mb-4">Website Arsip Dokumen KPID Sumatera Selatan</h1>
                        <p className="text-white text-xl leading-relaxed">Sistem arsip dokumen KPID merupakan sistem pengelolaan dokumen yang dirancang untuk mempermudah proses pengarsipan dan administrasi surat menyurat di lingkungan internal KPID SUMSEL.</p>
                    </div>
                </div>

            </div>
        </section>
    );
};