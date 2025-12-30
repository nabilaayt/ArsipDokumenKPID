import { useState } from "react";
import { 
    getDokumen,
    getStats,
    addDokumen,
    updateDokumen,
    deleteDokumen 
} from "../services/document";

export default function useDoc() {
    const [dokumen, setDokumen] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDokumen = async (params = {}) => {
        try {
            setLoading(true);
            const res = await getDokumen(params);
            setDokumen(Array.isArray(res.data.payload) ? res.data.payload : []);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await getStats();
            setStats(res.data.data);
        } catch (error) {
            console.error("Gagal mengambil stats:", error);
        }
    };

    const createDokumen = async (formData) => {
        const res = await addDokumen(formData);
        fetchDokumen();
        return res;
    };

    const editDokumen = async (id, formData) => {
        const res = await updateDokumen(id, formData);
        fetchDokumen();
        return res;
    };

    const removeDokumen = async (id) => {
        await deleteDokumen(id);
        fetchDokumen();
    };

    return {
        dokumen,
        stats,
        loading,
        error,
        fetchDokumen,
        fetchStats, 
        createDokumen,
        editDokumen,
        removeDokumen,
    };
}
