const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory for easy access
const upload = multer({ storage });

const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid"); // For generating unique file names

// Use your connection string from the Azure portal
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("Azure Storage connection string is not defined in environment variables.");
}

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Upload File Function
const uploadFileToAzure = async (containerName, fileBuffer, fileName) => {
    try {
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Ensure the container exists
        await containerClient.createIfNotExists({
            access: "container", // "container" makes blobs publicly accessible; adjust as needed
        });

        // Generate a unique blob name
        const blobName = `${uuidv4()}-${fileName}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload the file
        await blockBlobClient.uploadData(fileBuffer, {
            blobHTTPHeaders: { blobContentType: "application/octet-stream" }, // Set the correct MIME type
        });

        // Return the blob's URL
        return blockBlobClient.url;
    } catch (error) {
        console.error("Error uploading file to Azure:", error.message);
        throw error;
    }
};

module.exports = { uploadFileToAzure,upload };




