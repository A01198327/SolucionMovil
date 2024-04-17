const express = require("express");
const router = express.Router();
const login = require("../services/loginUsuario");

router.get('/', async function (req, res, next){
    try {
        const { username, passkey } = req.query;
        if (!username || !passkey) {
            return res.status(400).json({ error: 'Error con el usuario o contraseña' });
        }
        const result = await login.getUsuario(username,passkey);
        res.json(result);
    } catch (err) {
        console.error(`Error`, err.message);
        next(err);
    }
});

module.exports = router;
