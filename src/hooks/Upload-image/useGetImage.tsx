import { apiClient } from "@/lib/httpClient";
import React, { useState } from 'react'

interface FileData {
    fileName: string;
    fileSize: number;
    mimeType: string;
    refId: string;
    belongsTo: 'user' | 'company' | 'other';
}

const useGetImageURL = () => {
    const [imageURL, setImageURL] = useState<string | null>(null)
    const [s3Response, setS3Response] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const getImageURL = async (fileData: FileData) => {
        setLoading(true)
        setError(null)
        setImageURL(null)
        try {
            const response = await apiClient.post('/assets/upload-single', fileData)
            console.log("response", response.data)
            setImageURL(response.data.uploadUrl)
            setS3Response(response.data?.assetS3Object?._id);
            console.log(imageURL ," s3Response Imahge");
            console.log("fileData in useGetImageURL", s3Response);
            return response.data;

        } catch (error) {
            setError(error as string)
            throw error
        } finally {
            setLoading(false)
        }
    }
    return {getImageURL, imageURL, loading, error}
}

export default useGetImageURL;
