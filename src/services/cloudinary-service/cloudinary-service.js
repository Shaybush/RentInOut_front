import axios from 'axios';
import { doApiMethod } from '../axios-service/axios-service';
import { successHandler , errorHandler} from './../extra-services/extra-services';
export const uploadBannerImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rentinoutprofile");
    formData.append("cloud_name", "dpmpi8dwb");
    try {
        const resp = await axios.post(
            "https://api.cloudinary.com/v1_1/dpmpi8dwb/image/upload",
            formData
        );
        return ({ url: resp.data.url, img_id: resp.data.public_id })
    } catch(err){
        errorHandler(err)
    }
}

    export const uploadProfileImg = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "profilpreset");
        formData.append("cloud_name", "dgxzsxpoe");
        try{
            const resp = await axios.post(
                "https://api.cloudinary.com/v1_1/dgxzsxpoe/image/upload",
                formData
            );
            successHandler("Upload image succesfully!")
           return ({url:resp.data.url , img_id: resp.data.public_id })
        }
        catch(err){
            errorHandler(err)
        }
    }
    export const uploadPostImages = async (files) => {
        const formData = new FormData();
        formData.append("file", files);
        formData.append("upload_preset", "rentinoutprofile");
        formData.append("cloud_name", "dpmpi8dwb");
        try{
            const resp = await axios.post(
                "https://api.cloudinary.com/v1_1/dpmpi8dwb/image/upload",
                formData
            );
            return ({url:resp.data.url , img_id: resp.data.public_id })
        }
        catch(err){
            errorHandler(err)
        }
    }
    export const deleteProfileImage = async (img_id) => {
        let url = "/users/cloudinary/profileDel/?id=" + img_id
        try {
            const {data} = await doApiMethod(url , "POST")
            console.log(data.result)
            return data.result
        } catch (err) {
            errorHandler(err)
        }
    }
    export const deleteBannerImage = async (img_id) => {
        let url = "/users/cloudinary/bannerDel/?id=" + img_id
        try {
            const {data} = await doApiMethod(url , "POST")
            return data.result
        } catch (err) {
            errorHandler(err)
        }
    }


