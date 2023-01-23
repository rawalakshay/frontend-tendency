import axios from 'axios';

export default function data(req, res) {

    axios.get('https://eshop-deve.herokuapp.com/api/v2/orders', {
        headers: {
            authorization: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwUGFINU55VXRxTUkzMDZtajdZVHdHV3JIZE81cWxmaCIsImlhdCI6MTYyMDY2Mjk4NjIwM30.lhfzSXW9_TC67SdDKyDbMOYiYsKuSk6bG6XDE1wz2OL4Tq0Og9NbLMhb0LUtmrgzfWiTrqAFfnPldd8QzWvgVQ'
        }
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => res.status(500).json(error));
}   