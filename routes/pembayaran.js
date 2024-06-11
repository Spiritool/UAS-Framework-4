var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_Pembayaran = require('../model/Model_Pembayaran.js');
const Model_Users = require('../model/Model_Users.js')

router.get('/create', async function (req, res, next) {
try {
    let level_users = req.session.level;
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if(Data[0].level_users == "2") {
    res.render('service/create', {
        nama_service: '',
    })
    }
    else if (Data[0].level_users == "1"){
        req.flash('failure', 'Anda bukan admin');
        res.redirect('/sevice')
    }
} catch (Data) {
    req.flash('invalid', 'Anda harus login');
    res.redirect('/login')
}
})

router.post('/store', async function (req, res, next) {
    try {
        let { id_users, id_menu, jumlah} = req.body;
        let Data = {
            id_users, 
            id_menu, 
            jumlah,
            status_pembayaran: "belum dibayar"
        }
        console.log(Data);
        await Model_Pembayaran.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/menu/users');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/menu/users')
    }
})




module.exports = router;