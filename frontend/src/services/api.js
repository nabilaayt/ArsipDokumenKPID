const BASE_URL = "http://localhost:3000/api";

/**
 * Helper untuk menyertakan token JWT di header
 * Jika mengirim file (isFormData = true), kita HARUS membiarkan browser 
 * mengatur Content-Type secara otomatis (termasuk boundary-nya).
 */
const getHeaders = (isFormData = false) => {
    const token = localStorage.getItem("token");
    const headers = {};
    
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    
    // PENTING: Jika isFormData true, jangan set Content-Type sama sekali!
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }
    
    return headers;
};

// 1. LOGIN
export const login = async (email, password) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal Login");
    return data;
};

// 2. AMBIL SEMUA DOKUMEN
export const getDokumen = async () => {
    const response = await fetch(`${BASE_URL}/dokumen`, {
        method: "GET",
        headers: getHeaders()
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal mengambil data");
    return data;
};

// 3. TAMBAH DOKUMEN (ADMIN ONLY)
export const addDokumen = async (formData) => {
    const response = await fetch(`${BASE_URL}/dokumen`, {
        method: "POST",
        headers: getHeaders(true), // Mengirim true agar Content-Type kosong
        body: formData, 
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal menambah dokumen");
    return data;
};

// 4. STATISTIK DASHBOARD
export const getStats = async () => {
    const response = await fetch(`${BASE_URL}/stats`, {
        method: "GET",
        headers: getHeaders()
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal mengambil statistik");
    return data;
};

// 5. HAPUS DOKUMEN (ADMIN ONLY)
export const deleteDokumen = async (id) => {
    const response = await fetch(`${BASE_URL}/dokumen/${id}`, {
        method: "DELETE",
        headers: getHeaders()
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal menghapus");
    return data;
};

// 6. UPDATE DOKUMEN (ADMIN ONLY)
export const updateDokumen = async (id, formData) => {
    const response = await fetch(`${BASE_URL}/dokumen/${id}`, {
        method: "PUT",
        headers: getHeaders(true),
        body: formData,
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Gagal memperbarui dokumen");
    return data;
};