import axios from 'axios';

export default function data(req, res) {

    axios.get('https://eshop-deve.herokuapp.com/api/v2/orders', {
        headers: {
            authorization: process.env.ESHOP_TOKEN
        }
    })
        .then(response => {
            res.status(200).json(response.data);
        })
        .catch(error => res.status(500).json(error));
}   