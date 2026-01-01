import { useState } from "react";
import { convertPdfToWord, convertWordToPdf } from "../services/convertFile";

const getConvertedFileName = (originalName, type) => {
    if (type === "wordToPdf") {
        return originalName.replace(/\.(doc|docx)$/i, ".pdf");
    }
    if (type === "pdfToWord") {
        return originalName.replace(/\.pdf$/i, ".docx");
    }
    return originalName;
};

export default function useConvertFile() {
    const [files, setFiles] = useState({
        wordToPdf: [],
        pdfToWord: [],
    });

    const [loading, setLoading] = useState(false);

    const convertFile = async (file, type) => {
        const id = Date.now();

        const newFile = {
            id,
            name: file.name,
            convertedName: getConvertedFileName(file.name, type),
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            status: "converting",
            downloadUrl: null,
        };

        setFiles(prev => ({
            ...prev,
            [type]: [newFile, ...prev[type]]
        }));

        setLoading(true);

        try {
            const response =
                type === "wordToPdf"
                    ? await convertWordToPdf(file)
                    : await convertPdfToWord(file);

            const url = response.data.payload.url_download;

            setFiles(prev => ({
                ...prev,
                [type]: prev[type].map(f =>
                    f.id === id
                        ? { 
                            ...f, 
                            status: "done", 
                            downloadUrl: url,
                        }
                        : f
                )
            }));
        } catch (error) {
            console.error(error);
            setFiles(prev => ({
                ...prev,
                [type]: prev[type].filter(f => f.id !== id)
            }));
        } finally {
            setLoading(false);
        }
    };

    return{
        files,
        loading,
        convertFile,
    };
}