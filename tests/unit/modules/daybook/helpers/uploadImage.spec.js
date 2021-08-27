import axios from 'axios'
import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
    cloud_name: 'ddh2mpcsq',
    api_key: '642555744553676',
    api_secret: 'lTbtfyNs4uUNBZkSkU9Q-_DCqoM'
})

describe('Pruebas en el uploadImage', () => {
    test('Debe de cargar un archivo y retornar el url', async (done) => {
        const { data } = await axios.get('https://res.cloudinary.com/ddh2mpcsq/image/upload/v1616787766/f78k4eeymqowiqyzpit2.jpg', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'foto.jpg')
        const url = await uploadImage(file)
        expect(typeof url).toBe('string')
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
            done()
        })
    })
})