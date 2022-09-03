import React, {useState, useEffect} from 'react'
import PaymentLayout from '../Layouts/PaymentLayout'
import { useSelector } from 'react-redux'
import {Left, Right, Container, CountDown, Info, Instruksi, Bank, InputContainer, Buttons, Konfirmasi, Upload, Button, Title} from '../Styles/Transfer'
import { useNavigate } from 'react-router-dom'
import {FiCopy} from 'react-icons/fi'
import {AiOutlineCheck} from 'react-icons/ai'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

export default function Transfer() {
    let text = useSelector(state => state.items.RentCar.payment);
    let detail = useSelector(state => state.items.RentCar);
    let [konfirmasi, setKonfirmasi] = useState(false);
    let navigate = useNavigate();
    let [pembayaran, setPembayaran] = useState([23,59,59]);
    let [bukti, setBukti] = useState([9,59]);
    let [active, setActive] = useState(["active", "", "", ""]);
    let [copy, setCopy] = useState(false);

    useEffect(() => {
        let [jam, menit, detik] = pembayaran;
        setInterval(() => {
            if(menit===0 && detik===0){
                jam=jam-1;
                menit=60;
                detik=60;
            }
            else if(detik===0){
                menit=menit-1;
                detik=60;
            }
            detik-=1;
            setPembayaran([jam,menit,detik]);
        }, 1000)
    }, [])

    let uploadData = async () => {
        try {
            let rawData = await window.fetch("https://bootcamp-rent-car.herokuapp.com/customer/order", {
                method: "POST",
                headers: {
                    "access_token": window.localStorage.getItem("token"),
                    "content-Type": "application/json",
                },
                body: JSON.stringify({
                    "start_rent_at": detail.mulai,
                    "finish_rent_at": detail.akhir,
                    "car_id": detail.id
                })
            });

            if(rawData.status !== 201){
                throw new Error(rawData)
            }

            await rawData.json();

        } catch (error) {
            console.log(error);
        }
    }
    
    let upload = () => {
        setKonfirmasi(true);
        let [menit, detik] = bukti;
        setInterval(() => {
            if(detik===0){
                menit=menit-1;
                detik=59;
            }
            else{
                detik-=1;
            }
            setBukti([menit,detik]);
        }, 1000)
    }

    let copyNomor = () => {
        navigator.clipboard.writeText(54104257877);
        setCopy([true,copy[1]]);
        setTimeout(() => {
            setCopy([false, copy[1]]);
        }, 2000)
    }

    let copyHarga = () => {
        navigator.clipboard.writeText(3500000);
        setCopy([copy[0],true]);
        setTimeout(() => {
            setCopy([copy[0], false]);
        }, 2000)
    }

    const getUploadParams = ({ meta }) => {
        const url = 'https://httpbin.org/post'
        return { url, meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` } }
    }
    
    const handleChangeStatus = ({ meta }, status) => {
        console.log(status, meta)
    }
    
    const handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }

    return (
        <PaymentLayout active={["active", "active", ""]} text={`${text} Transfer`} back="/payment" version="2">
            <Container>
                <Left>
                    <CountDown>
                        <div>
                            <h3>Selesaikan Pembayaran Sebelum</h3>
                            <p>Rabu, 19 Mei 2022 jam 13.00 WIB</p>
                        </div>
                        <h3><span>{pembayaran[0]<10 ? `0${pembayaran[0]}` : pembayaran[0]}</span><span>:</span><span>{pembayaran[1]<10 ? `0${pembayaran[1]}` : pembayaran[1]}</span><span>:</span><span>{pembayaran[2]<10 ? `0${pembayaran[2]}` : pembayaran[2]}</span></h3>
                    </CountDown>
                    <Info>
                        <h3>Lakukan Transfer Ke</h3>
                        <Bank>
                            <div>{text}</div>
                            <p>{text} Transfer</p>
                        </Bank>
                        <p>a.n Binar Car Rental</p>
                        <InputContainer>
                            <label for="nomor">Nomor Rekening</label>
                            <input type="text" id='nomor' value="54104257877" disabled/>
                            {copy[0] ? <AiOutlineCheck className='icon'></AiOutlineCheck> : <FiCopy className='icon' onClick={copyNomor}></FiCopy>}
                        </InputContainer>
                        <InputContainer>
                            <label for="nomor">Total Bayar</label>
                            <input type="text" id='nomor' value="Rp. 3.500.000,-" disabled/>
                            {copy[1] ? <AiOutlineCheck className='icon'></AiOutlineCheck> : <FiCopy className='icon' onClick={copyHarga}></FiCopy>}
                        </InputContainer>
                    </Info>
                    <Instruksi>
                        <h3>Intruksi Pembayaran</h3>
                        <Buttons>
                            <button className={active[0]} onClick={() => setActive(["active", "", "", ""])}>ATM {text}</button>
                            <button className={active[1]} onClick={() => setActive([ "","active","", ""])}>M-{text}</button>
                            <button className={active[2]} onClick={() => setActive(["", "", "active", ""])}>{text} Klik</button>
                            <button className={active[3]} onClick={() => setActive(["", "", "", "active"])}>Internet Banking</button>
                        </Buttons>
                        {active[0] ? 
                            <ul>
                                <li>Masukkan kartu ATM, lalu PIN</li>
                                <li>menu “Transaksi Lainnya” – "Transfer” – “Ke Rek {text} Virtual Account”</li>
                                <li> Masukkan nomor {text} Virtual Account: 70020+Order ID<span>Contoh</span> <span> No. Peserta: 12345678, maka ditulis 7002012345678</span></li>
                                <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                            </ul>
                        :
                            null
                        }
                        {active[1] ? 
                            <ul>
                                <li>Masuk ke aplikasi {text} Mobile, lalu PIN</li>
                                <li>menu “Transaksi Lainnya” – "Transfer” – “Ke Rek {text} Virtual Account”</li>
                                <li> Masukkan nomor {text} Virtual Account: 70020+Order ID<span>Contoh</span> <span> No. Peserta: 12345678, maka ditulis 7002012345678</span></li>
                                <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                            </ul>
                        :
                            null
                        }
                        {active[2] ? 
                            <ul>
                                <li>Masuk aplikadi M-{text}, lalu PIN</li>
                                <li>menu “Transaksi Lainnya” – "Transfer” – “Ke Rek {text} Virtual Account”</li>
                                <li> Masukkan nomor {text} Virtual Account: 70020+Order ID<span>Contoh</span> <span> No. Peserta: 12345678, maka ditulis 7002012345678</span></li>
                                <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                            </ul>
                        :
                            null
                        }
                        {active[3] ? 
                            <ul>
                                <li>Masuk ke internet Banking, lalu PIN</li>
                                <li>menu “Transaksi Lainnya” – ‘Transfer” – “Ke Rek {text} Virtual Account”</li>
                                <li> Masukkan nomor {text} Virtual Account: 70020+Order ID<span>Contoh</span> <span> No. Peserta: 12345678, maka ditulis 7002012345678</span></li>
                                <li>Layar ATM akan menampilkan konfirmasi, ikuti instruksi untuk menyelesaikan transaksi</li>
                                <li>Ambil dan simpanlah bukti transaksi tersebut</li>
                            </ul>
                        :
                            null
                        }
                    </Instruksi>
                </Left>
                <Right>
                    {konfirmasi ? 
                        <Upload>
                            <Title>
                                <h3>Konfirmasi Pembayaran</h3>
                                <div>
                                    <h3><span>{bukti[0]< 10 ? `0${bukti[0]}` : bukti[0]}</span><span>:</span><span>{bukti[1]< 10 ? `0${bukti[1]}` : bukti[1]}</span></h3>
                                </div>
                            </Title>
                            <p>Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.</p>
                            <h3>Upload Bukti Pembayaran</h3>
                            <p>Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa upload bukti bayarmu</p>
                            <Dropzone
                                getUploadParams={getUploadParams}
                                onChangeStatus={handleChangeStatus}
                                onSubmit={handleSubmit}
                                accept="image/*"
                                inputContent={(files, extra) => (extra.reject ? 'Image, audio and video files only' : "Input File")}
                                styles={{
                                    dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
                                    inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
                                }}
                            />
                            <Button onClick={() => {
                                navigate("/payment/tiket");
                                uploadData();
                            }}>Upload</Button>
                        </Upload>
                    :
                        <Konfirmasi>
                            <p>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</p>
                            <Button onClick={upload}>Konfirmasi Pembayaran</Button>
                        </Konfirmasi>
                    }
                </Right>
            </Container>
        </PaymentLayout>
    )
}