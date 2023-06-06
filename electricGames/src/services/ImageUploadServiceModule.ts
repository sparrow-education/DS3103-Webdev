import axios from 'axios';

const ImageUploadServiceModule = (
    () => {

        // Endpoints for upload games to server
        const electricGameApiEndpoints = {
            upload: "https://localhost:7215/api/UploadImage" 
        }

        const uploadImage = async ( image: File ) => {
            try {
                const formData = new FormData();
                formData.append("file", image);
                
                // Passing the data as an object destructure it
                // with properties defined below.
                const result = await axios({
                    url: electricGameApiEndpoints.upload,                // endpoint of image upload
                    method: "POST",                                      // http post
                    data: formData,                                      // the image object
                    headers: {                                           // packet data header defines this object as type form-data
                        "Content-Type": "multipart/form-data"
                    }
                })
                return result.status;
            } catch {
                console.log(`File ${image.name} not uploaded`);
            }      
        }
        return { uploadImage }
    }
)();

export default ImageUploadServiceModule;