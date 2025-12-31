import { useState } from "react";
import { convertPdfToWord, convertWordToPdf } from "../services/convertFile";

export default function useConvertFile() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const convertFile = async (file, type) => {
        const id = Date.now();

        const newFile = {
            id,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
            status: "converting",
            downloadUrl: null,
        };

        setFiles((prev) => [newFile, ...prev]);
        setLoading(true);

        try {
            const response =
                type === "wordToPdf"
                    ? await convertWordToPdf(file)
                    : await convertPdfToWord(file);

            const url = response.data.data.url_download;

            setFiles((prev) => 
                prev.map((f) =>
                    f.id === id 
                        ? { ...f, status: "done", downloadUrl: url }
                        : f
                )
            );
        } catch (error) {
            console.error(error);
            setFiles((prev) => prev.filter((f) => f.id !== id));
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