import axiosInstance from "./axiosInstance";

export const convertWordToPdf = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post("/konversi/word-to-pdf", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const convertPdfToWord = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post("/konversi/pdf-to-word", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });    
}