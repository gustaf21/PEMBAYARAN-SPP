const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 1300;

index.set('view egine', 'hbs');

index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'gustaf',
    password: '0000',
    database: 'pembayaran_spp'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})
index.get('/', (req, res) => {
    koneksi.query('use pembayaran_spp', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'LOGIN',
            data: hasil
        });
    });
});
index.get('/input', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('input.hbs',{
            judulhalaman: 'DATA-PELANGGAN',
            data: hasil
        });
    });
});

index.post('/input', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/input');
    }
    )
});

index.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/data');
         }
    )
});
index.get('/data', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('data.hbs',{
            judulhalaman: 'DATA PEMBAYARAN',
            data: hasil
        });
    });
});

index.post('/data', (req, res) =>{
    var siswa = req.body.inputsiswa;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var tanggal_transaksi = req.body.inputtanggal_transaksi;
    koneksi.query('INSERT INTO pembayaran(siswa, bulan, jumlah, tanggal_transaksi)values(?,?,?,?)',
    [siswa, bulan, jumlah, tanggal_transaksi],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/data');
    }
    )
});

index.get('/hapus-siswa/:siswa', (req, res) => {
    var siswa = req.params.siswa;
    koneksi.query("DELETE FROM pembayaran WHERE siswa=?",
         [siswa], (err, hasil) => {
             if(err) throw err;
             res.redirect('/data');
         }
    )
});
index.get('/logout', (req, res) => {
    koneksi.query('use pembayaran_spp', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs',{
            judulhalaman: 'LOGIN',
            data: hasil
        });
    });
});

index.listen(port, () => {
    console.log(`app berjalan pada port ${port}`);
});