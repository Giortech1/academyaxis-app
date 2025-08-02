import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebaseConfig';

export const uploadPhoto = async (file, options = {}) => {
    const { folder = 'uploads', uid = '', nameSlug = '' } = options;

    if (!file) throw new Error('No file provided');

    const ext = file.type?.split('/').pop() || 'jpg';
    const timeStamp = Date.now();
    const baseName =
        nameSlug ||
        (file.name ? file.name.split('.').shift() : 'file');

    const subFolder = uid ? `${uid}/` : '';
    const filePath = `${folder}/${subFolder}${baseName}_${timeStamp}.${ext}`;

    const fileRef = ref(storage, filePath);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
};

export const uploadDocument = async (file, options = {}) => {
    const { folder = 'documents', uid = '', nameSlug = '' } = options;

    if (!file) throw new Error('No file provided');

    const fileName = file.name || 'document';
    const ext = fileName.split('.').pop() || 'pdf';
    const timeStamp = Date.now();
    const baseName = nameSlug || fileName.split('.').shift();

    const subFolder = uid ? `${uid}/` : '';
    const filePath = `${folder}/${subFolder}${baseName}_${timeStamp}.${ext}`;

    const fileRef = ref(storage, filePath);

    try {
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        return downloadURL;
    } catch (error) {
        throw new Error(`Document upload failed: ${error.message}`);
    }
};

export const validateFileType = (file, allowedTypes = []) => {
    if (!file) return false;
    return allowedTypes.includes(file.type);
};

export const validateFileSize = (file, maxSizeInMB = 5) => {
    if (!file) return false;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    return file.size <= maxSizeInBytes;
};