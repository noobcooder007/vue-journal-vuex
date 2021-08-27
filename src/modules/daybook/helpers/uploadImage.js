import axios from "axios"

const uploadImage = async (file) => {
    if (!file) {
        return
    }
    try {
        const fromData = new FormData()
        fromData.append('upload_preset', 'curso-vue')
        fromData.append('file', file)
        const url = 'https://api.cloudinary.com/v1_1/ddh2mpcsq/image/upload'
        const {data} = await axios.post(url, fromData)
        // console.log(data)
        return data.secure_url
    } catch (error) {
        console.log('Error al subir la imagen: ', error)
        return null
    }
}

export default uploadImage