import axiosInstance from "./axiosInstance";

// Ambil dokumen
export const getDokumen = (params = {}) => {
    return axiosInstance.get("/dokumen", { params });
};

// Statistik dashboard
export const getStats = () => {
    return axiosInstance.get("/stats");
};

// Ambil dokumen berdasarkan id
export const getDokumenById = (id) => {
    return axiosInstance.get(`/dokumen/${id}`);
};

// Tambah dokumen
export const addDokumen = (formData) => {
    return axiosInstance.post("/dokumen", formData);
};

// Update dokumen
export const updateDokumen = (id, formData) => {
    return axiosInstance.put(`/dokumen/${id}`, formData);
};

// Hapus dokumen
export const deleteDokumen = (id) => {
    return axiosInstance.delete(`/dokumen/${id}`);
};