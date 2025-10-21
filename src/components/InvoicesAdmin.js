import React, { useState, useEffect } from 'react';
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector, useDispatch } from 'react-redux';
import http from '../api/http';
import { useNavigate } from 'react-router-dom';
import {SERVER_URL} from "../consts";

const InvoicesAdmin = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAdminLogged = useSelector(state => state.isAdminLogged);

  const [taxdatas, setTaxdatas] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)


  const [sellercompanyname, setSellerCompanyName] = useState('')
  const [sellercompanystreet, setSellerCompanyStreet] = useState('')
  const [sellercompanypostcode, setSellerCompanyPostCode] = useState('')
  const [sellercompanycity, setSellerCompanyCity] = useState('')
  const [sellercompanynip, setSellerCompanyNip] = useState('')
  const [sellercompanyregon, setSellerCompanyRegon] = useState('')
  const [invoicesactualnumber, setInvoicesActualNumber] = useState(0)
  const [vatpercentage, setVatPercentage] = useState(0)
  const [basisforvatexemption, setBasisForVatExemption] = useState('')
  const [editingId, setEditingId] = useState('')


  const [orders, setOrders] = useState([])
  const [totalamount, setTotalAmount] = useState(0)

  const [invoices, setInvoices] = useState([])



  const [isForm2Visible, setIsForm2Visible] = useState(false)

  const [isForm3Visible, setIsForm3Visible] = useState(false)




const [correctioninvoicenumber, setCorrectioninvoicenumber] = useState('')
const [correctiondateofissue, setCorrectiondateofissue] = useState('')
const [correctiondateofsale, setCorrectiondateofsale] = useState('')
const [correctionsellercompanyname, setCorrectionsellercompanyname] = useState('')
const [correctionsellercompanystreet, setCorrectionsellercompanystreet] = useState('')
const [correctionsellercompanypostcode, setCorrectionsellercompanypostcode] = useState('')
const [correctionsellercompanycity, setCorrectionsellercompanycity] = useState('')
const [correctionsellercompanynip, setCorrectionsellercompanynip] = useState('')
const [correctionsellercompanyregon, setCorrectionsellercompanyregon] = useState('')
const [correctioncustomername, setCorrectioncustomername] = useState('')
const [correctioncustomersurname, setCorrectioncustomersurname] = useState('')
const [correctioncustomerstreet, setCorrectioncustomerstreet] = useState('')
const [correctioncustomerpostcode, setCorrectioncustomerpostcode] = useState('')
const [correctioncustomercity, setCorrectioncustomercity] = useState('')
const [correctioncustomercompanyname, setCorrectioncustomercompanyname] = useState('')
const [correctioncustomercompanystreet, setCorrectioncustomercompanystreet] = useState('')
const [correctioncustomercompanypostcode, setCorrectioncustomercompanypostcode] = useState('')
const [correctioncustomercompanycity, setCorrectioncustomercompanycity] = useState('')
const [correctioncustomerinvoice, setCorrectioncustomerinvoice] = useState(false)
const [correctioncustomernip, setCorrectioncustomernip] = useState('')
const [correctioncustomerregon, setCorrectioncustomerregon] = useState('')
const [correctionordercontent, setCorrectionordercontent] = useState('')
const [correctionorderamount, setCorrectionorderamount] = useState('')
const [correctionbasisofvatexemption, Setcorrectionbasisofvatexemption] = useState('')
const [correctioninvoiceterm, Setcorrectioninvoiceterm] = useState('')
const [correctionordertime, Setcorrectionordertime] = useState('')     
const [correctionlogin, Setcorrectionlogin] = useState('') 
const [correctionid, setCorrectionid] = useState('')







const [cinvoicenumber, setCinvoicenumber] = useState('')
const [cdateofsale, setCdateofsale] = useState('')
const [csellercompanyname, setCsellercompanyname] = useState('')
const [csellercompanystreet, setCsellercompanystreet] = useState('')
const [csellercompanypostcode, setCsellercompanypostcode] = useState('')
const [csellercompanycity, setCsellercompanycity] = useState('')
const [csellercompanynip, setCsellercompanynip] = useState('')
const [csellercompanyregon, setCsellercompanyregon] = useState('')
const [ccustomername, setCcustomername] = useState('')
const [ccustomersurname, setCcustomersurname] = useState('')
const [ccustomerstreet, setCcustomerstreet] = useState('')
const [ccustomerpostcode, setCcustomerpostcode] = useState('')
const [ccustomercity, setCcustomercity] = useState('')
const [ccustomercompanyname, setCcustomercompanyname] = useState('')
const [ccustomercompanystreet, setCcustomercompanystreet] = useState('')
const [ccustomercompanypostcode, setCcustomercompanypostcode] = useState('')
const [ccustomercompanycity, setCcustomercompanycity] = useState('')
const [ccustomerinvoice, setCcustomerinvoice] = useState(false)
const [ccustomercompanynip, setCcustomercompanynip] = useState('')
const [ccustomercompanyregon, setCcustomercompanyregon] = useState('')
const [cordercontent, setCordercontent] = useState('')
const [corderamount, setCorderamount] = useState(0)
const [cbasisforvatexemption, setCbasisforvatexemption] = useState('')
const [cpaymentterm, setCpaymentterm] = useState('')
const [cordertime, setCordertime] = useState('')
const [clogin, setClogin] = useState('')
const [correctionreason, setCorrectionreason] = useState('')
const [correcteditems, setCorrecteditems] = useState('')


const [correctives, setCorrectives] = useState([])





useEffect(() => {
  dispatch({
    type: 'CHANGE_INVOICE_DATA',
    invoicenumber: '',
    invoicedateofissue: '',
    dateofsale: '',
    sellercompanyname: '',
    sellercompanystreet: '',
    sellercompanypostcode: '',
    sellercompanycity: '',
    sellercompanynip: '',
    sellercompanyregon: '',
    customername: '',
    customersurname: '',
    customerstreet: '',
    customerpostcode: '',
    customercity: '',
    customercompanyname: '',
    customercompanystreet: '',
    customercompanypostcode: '',
    customercompanycity: '',
    customerinvoice: '',
    customercompanynip: '',
    customercompanyregon: '',
    ordercontent: '',
    orderamount: '',
    basisforvatexemption: '',
    paymentterm: '',
    ordertime: '',
    login: ''
  });
}, []);


  
     useEffect(() => {
        http.get(`${SERVER_URL}/taxdatas`)
        .then((response) => setTaxdatas(response.data))
        .catch((err) => console.log('error fetching taxdatas, error: ' + err))
    }, [])

      useEffect(() => {
        http.get(`${SERVER_URL}/correctives`)
        .then((response) => setCorrectives(response.data))
        .catch((err) => console.log('error fetching correctives, error: ' + err))
    }, [])

    
     useEffect(() => {
        http.get(`${SERVER_URL}/invoices`)
        .then((response) => setInvoices(response.data))
        .catch((err) => console.log('error fetching invoices, error: ' + err))
    }, [])




useEffect(() => {
  http.get(`${SERVER_URL}/orders`)
    .then((response) => {
      const currentYear = new Date().getFullYear().toString(); // np. "2025"
      const filteredOrders = response.data.filter(order => {
        const parts = order.ordertime.split('-');
        const yearPart = parts[2]?.split(' ')[0]; // "2025" z "2025 19:59:20"
        return yearPart === currentYear;
      });

      setOrders(filteredOrders);

      const sum = filteredOrders.reduce((acc, order) => acc + (Number(order.orderamount) || 0), 0);
      setTotalAmount(sum);
    })
    .catch((err) => console.log('error fetching orders, error: ' + err));
}, []);




    const handleEdit = (editingId, companyname, companystreet, companypostcode, companycity, companynip, companyregon, actualnumber, vatpercentage, basisforvatexemption ) => {
        setIsFormVisible(!isFormVisible)
        setSellerCompanyName(companyname)
        setSellerCompanyStreet(companystreet)
        setSellerCompanyPostCode(companypostcode)
        setSellerCompanyCity(companycity)
        setSellerCompanyNip(companynip)
        setSellerCompanyRegon(companyregon)
        setInvoicesActualNumber(actualnumber)
        setVatPercentage(vatpercentage)
        setBasisForVatExemption(basisforvatexemption)
        setEditingId(editingId)
    }


 const handleSubmit = (e) => {
  e.preventDefault();

  const confirmEdit = window.confirm("Czy na pewno chcesz zedytować dane?");
  if (!confirmEdit) return; // Jeśli użytkownik kliknie "Nie", zatrzymaj

  setIsFormVisible(false);

  http.put(`${SERVER_URL}/taxdatas/${editingId}`, {
    sellercompanyname,
    sellercompanystreet,
    sellercompanypostcode,
    sellercompanycity,
    sellercompanynip,
    sellercompanyregon,
    invoicesactualnumber,
    vatpercentage,
    basisforvatexemption
  })


    .then((response) => {
      setTaxdatas(taxdatas.map(td => td._id === editingId ? response.data : td));
      setSellerCompanyName('');
      setSellerCompanyStreet('');
      setSellerCompanyPostCode('');
      setSellerCompanyCity('');
      setSellerCompanyNip('');
      setSellerCompanyRegon('');
      setInvoicesActualNumber(0);
      setVatPercentage(0);
      setBasisForVatExemption('');
      setEditingId('');
    })
    .catch((err) => console.error("Error updating taxdatas:", err));
};

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'  // opcjonalnie płynne przewijanie
  });
}



const handleCreateCorrectiveInvoice = (invoicenumber,
   dateofsale,
    sellercompanyname,
     sellercompanystreet,
      sellercompanypostcode,
       sellercompanycity, 
       sellercompanynip,
        sellercompanyregon,
         customername, 
         customersurname, 
         customerstreet, 
         customerpostcode, 
         customercity, 
         customercompanyname, 
         customercompanystreet, 
         customercompanypostcode, 
         customercompanycity, 
         customerinvoice,
          customercompanynip, 
          customercompanyregon, 
          ordercontent, 
          orderamount, 
          basisforvatexemption, 
          paymentterm, 
          ordertime,
           login) => {
  setIsForm3Visible(!isForm3Visible)
  scrollToTop()

setCinvoicenumber(invoicenumber)
setCdateofsale(dateofsale)
setCsellercompanyname(sellercompanyname)
setCsellercompanystreet(sellercompanystreet)
setCsellercompanypostcode(sellercompanypostcode)
setCsellercompanycity(sellercompanycity)
setCsellercompanynip(sellercompanynip)
setCsellercompanyregon(sellercompanyregon)
setCcustomername(customername)
setCcustomersurname(customersurname)
setCcustomerstreet(customerstreet)
setCcustomerpostcode(customerpostcode)
setCcustomercity(customercity)
setCcustomercompanyname(customercompanyname)
setCcustomercompanystreet(customercompanystreet)
setCcustomercompanypostcode(customercompanypostcode)
setCcustomercompanycity(customercompanycity)
setCcustomerinvoice(customerinvoice)
setCcustomercompanynip(customercompanynip)
setCcustomercompanyregon(customercompanyregon)
setCordercontent(ordercontent)
setCorderamount(orderamount)
setCbasisforvatexemption(basisforvatexemption)
setCpaymentterm(paymentterm)
setCordertime(ordertime)
setClogin(login)
setCorrecteditems(ordercontent)





}


const handleEditInvoice = (
  id,
  invoicenumber,
  invoicedateofissue,
  dateofsale,
  sellercompanyname,
  sellercompanystreet,
  sellercompanypostcode,
  sellercompanycity,
  sellercompanynip,
  sellercompanyregon,
  customername,
  customersurname,
  customerstreet,
  customerpostcode,
  customercity,
  customercompanyname,
  customercompanystreet,
  customercompanypostcode,
  customercompanycity,
  customerinvoice,
  customercompanynip,
  customercompanyregon,
  ordercontent,
  orderamount,
  basisforvatexemption,
  paymentterm,
  ordertime,
  login







) => {
  setIsForm2Visible(true)
  scrollToTop()

  setCorrectionid(id)
  setCorrectioninvoicenumber(invoicenumber)
  setCorrectiondateofissue(invoicedateofissue)
  setCorrectiondateofsale(dateofsale)
  setCorrectionsellercompanyname(sellercompanyname)
  setCorrectionsellercompanystreet(sellercompanystreet)
  setCorrectionsellercompanypostcode(sellercompanypostcode)
  setCorrectionsellercompanycity(sellercompanycity)
  setCorrectionsellercompanynip(sellercompanynip)
  setCorrectionsellercompanyregon(sellercompanyregon)
  setCorrectioncustomername(customername)
  setCorrectioncustomersurname(customersurname)
  setCorrectioncustomerstreet(customerstreet)
  setCorrectioncustomerpostcode(customerpostcode)
  setCorrectioncustomercity(customercity)
  setCorrectioncustomercompanyname(customercompanyname)
  setCorrectioncustomercompanystreet(customercompanystreet)
  setCorrectioncustomercompanypostcode(customercompanypostcode)
  setCorrectioncustomercompanycity(customercompanycity)
  setCorrectioncustomerinvoice(customerinvoice)
  setCorrectioncustomernip(customercompanynip)
  setCorrectioncustomerregon(customercompanyregon)
  setCorrectionordercontent(ordercontent)
  setCorrectionorderamount(orderamount)
  Setcorrectionbasisofvatexemption(basisforvatexemption)
  Setcorrectioninvoiceterm(paymentterm)
  Setcorrectionordertime(ordertime)
  Setcorrectionlogin(login)
}



const handleSubmit2 = () => {


 http.put(`${SERVER_URL}/invoices/${correctionid}`, {
invoicenumber: correctioninvoicenumber,
  invoicedateofissue: correctiondateofissue,
  dateofsale: correctiondateofsale,
  sellercompanyname: correctionsellercompanyname,
  sellercompanystreet: correctionsellercompanystreet,
  sellercompanypostcode: correctionsellercompanypostcode,
  sellercompanycity: correctionsellercompanycity,
  sellercompanynip: correctionsellercompanynip,
  sellercompanyregon: correctionsellercompanyregon,
  customername: correctioncustomername,
  customersurname: correctioncustomersurname,
  customerstreet: correctioncustomerstreet,
  customerpostcode: correctioncustomerpostcode,
  customercity: correctioncustomercity,
  customercompanyname: correctioncustomercompanyname,
  customercompanystreet: correctioncustomercompanystreet,
  customercompanypostcode: correctioncustomercompanypostcode,
  customercompanycity: correctioncustomercompanycity,
  customerinvoice: correctioncustomerinvoice,
  customercompanynip: correctioncustomernip,
  customercompanyregon: correctioncustomerregon,
  ordercontent: correctionordercontent,
  orderamount: correctionorderamount,
  basisforvatexemption: correctionbasisofvatexemption,
  paymentterm: correctioninvoiceterm,
  ordertime: correctionordertime,
  login: correctionlogin

 }) 
   .then((response) => {
      setInvoices(prev =>
        prev.map(inv => inv._id === correctionid ? response.data : inv)
      );

      // Czyścimy formularz i chowamy
      setIsForm2Visible(false);
    })
 .catch((err) => console.error("Error updating invoices:", err));

  setIsForm2Visible(false)
}



const handleShowInvoice = (
  invoicenumber,
  invoicedateofissue,
  dateofsale,
  sellercompanyname,
  sellercompanystreet,
  sellercompanypostcode,
  sellercompanycity,
  sellercompanynip,
  sellercompanyregon,
  customername,
  customersurname,
  customerstreet,
  customerpostcode,
  customercity,
  customercompanyname,
  customercompanystreet,
  customercompanypostcode,
  customercompanycity,
  customerinvoice,
  customercompanynip,
  customercompanyregon,
  ordercontent,
  orderamount,
  basisforvatexemption,
  paymentterm,
  ordertime,
  login
) => {
 dispatch({
    type: 'CHANGE_INVOICE_DATA',
    invoicenumber,
    invoicedateofissue,
    dateofsale,
    sellercompanyname,
    sellercompanystreet,
    sellercompanypostcode,
    sellercompanycity,
    sellercompanynip,
    sellercompanyregon,
    customername,
    customersurname,
    customerstreet,
    customerpostcode,
    customercity,
    customercompanyname,
    customercompanystreet,
    customercompanypostcode,
    customercompanycity,
    customerinvoice,
    customercompanynip,
    customercompanyregon,
    ordercontent,
    orderamount,
    basisforvatexemption,
    paymentterm,
    ordertime,
    login
  });
  navigate('/widokfaktury')
};



function getFormattedDate() {
  const date = new Date();

  const day = date.getDate();
  const monthIndex = date.getMonth(); // 0 = styczeń, 6 = lipiec
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const polishMonths = [
    'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'
  ];

  const formattedDate = `${day}-${polishMonths[monthIndex]}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
}


const fetchCorrectives = () => {
  http.get(`${SERVER_URL}/correctives`)
    .then((res) => setCorrectives(res.data))
    .catch((err) => console.error('Error fetching correctives:', err));
};


const handleAddCorrectiveInvoice = (e) => {
e.preventDefault()

  // TUTAJ UZUPEŁNIĆ PARAMETRY 
   http.post(`${SERVER_URL}/correctives`, {
      
      numberofcorrectiveinvoice: 'KOR/' +  cinvoicenumber,
    dateofissuecorrectiveinvoice : getFormattedDate(),
    dateofsale: cdateofsale,
    numberofnativeinvoice: cinvoicenumber,
    sellercompanyname: csellercompanyname,
    sellercompanystreet: csellercompanystreet,
    sellercompanypostcode: csellercompanypostcode,
    sellercompanycity: csellercompanycity,
    sellercompanynip: csellercompanynip,
    sellercompanyregon: csellercompanyregon,
    customername: ccustomername,
    customersurname: ccustomersurname,
    customerstreet: ccustomerstreet,
    customerpostcode: ccustomerpostcode,
    customercity: ccustomercity,
    customercompanyname: ccustomercompanyname,
    customercompanystreet: ccustomercompanystreet,
    customercompanypostcode: ccustomercompanypostcode,
    customercompanycity: ccustomercompanycity,
    invoice: ccustomerinvoice,
    customercompanynip: ccustomercompanynip,
    customercompanyregon: ccustomercompanyregon,
    correctionreason: correctionreason,
    correcteditems: correcteditems,
    summary: '',
    orderamount: corderamount,
    basisforvatexemption: cbasisforvatexemption,
    paymentterm: cpaymentterm,
    ordertime: cordertime,
    login: clogin,
    })
    .then(() => {
  setCorrecteditems('');
  setCorrectionreason('');
  setIsForm3Visible(false);
  fetchCorrectives(); 
})
    .catch((err) => console.error("Error adding correctives", err));
}



const viewCorrectiveInvoiceAsAdmin = (
  coradminnumberofcorrectiveinvoice,
  coradmindateofissuecorrectiveinvoice,
  coradmindateofsale,
  coradminnumberofnativeinvoice,
  coradminsellercompanyname,
  coradminsellercompanystreet,
  coradminsellercompanypostcode,
  coradminsellercompanycity,
  coradminsellercompanynip,
  coradminsellercompanyregon,
  coradmincustomername,
  coradmincustomersurname,
  coradmincustomerstreet,
  coradmincustomerpostcode,
  coradmincustomercity,
  coradmincustomercompanyname,
  coradmincustomercompanystreet,
  coradmincustomercompanypostcode,
  coradmincustomercompanycity,
  coradmininvoice,
  coradmincustomercompanynip,
  coradmincustomercompanyregon,
  coradmincorrectionreason,
  coradmincorrecteditems,
  coradminsummary,
  coradminorderamount,
  coradminbasisforvatexemption,
  coradminpaymentterm,
  coradminordertime,
  coradminlogin
) => {

dispatch({
  type: 'CHANGE_CORRECTIVE_ADMIN',
  coradminnumberofcorrectiveinvoice: coradminnumberofcorrectiveinvoice,
  coradmindateofissuecorrectiveinvoice: coradmindateofissuecorrectiveinvoice,
  coradmindateofsale: coradmindateofsale,
  coradminnumberofnativeinvoice: coradminnumberofnativeinvoice,
  coradminsellercompanyname: coradminsellercompanyname,
  coradminsellercompanystreet: coradminsellercompanystreet,
  coradminsellercompanypostcode: coradminsellercompanypostcode,
  coradminsellercompanycity: coradminsellercompanycity,
  coradminsellercompanynip: coradminsellercompanynip,
  coradminsellercompanyregon: coradminsellercompanyregon,
  coradmincustomername: coradmincustomername,
  coradmincustomersurname: coradmincustomersurname,
  coradmincustomerstreet: coradmincustomerstreet,
  coradmincustomerpostcode: coradmincustomerpostcode,
  coradmincustomercity: coradmincustomercity,
  coradmincustomercompanyname: coradmincustomercompanyname,
  coradmincustomercompanystreet: coradmincustomercompanystreet,
  coradmincustomercompanypostcode: coradmincustomercompanypostcode,
  coradmincustomercompanycity: coradmincustomercompanycity,
  coradmininvoice: coradmininvoice,
  coradmincustomercompanynip: coradmincustomercompanynip,
  coradmincustomercompanyregon: coradmincustomercompanyregon,
  coradmincorrectionreason: coradmincorrectionreason,
  coradmincorrecteditems: coradmincorrecteditems,
  coradminsummary: coradminsummary,
  coradminorderamount: coradminorderamount,
  coradminbasisforvatexemption: coradminbasisforvatexemption,
  coradminpaymentterm: coradminpaymentterm,
  coradminordertime: coradminordertime,
  coradminlogin: coradminlogin
});


  navigate('/widokfakturykorygujacejadmin')

}


const generateReport = () => {
  navigate('/raport-fakturowy')
}
 

  return (
    <>
      {isAdminLogged ? (
        <div className="adminKokpit">
          <AdminWidgetToLogOut />
          <div className="invoicesAdminWrapper">
            {isFormVisible ? (
                <div className="editTaxDatasWrapper">
                    <h3>Formularz edycji profilu fakturowego sprzedającego: </h3>
                    <form onSubmit={handleSubmit}>
                        <label>nazwa firmy sprzedającego:<input type="text" value={sellercompanyname} onChange={(e) => setSellerCompanyName(e.target.value)}/></label>
                        <label>adres (ulica i nr domu i mieszkania) firmy sprzedającego:<input type="text" value={sellercompanystreet} onChange={(e) => setSellerCompanyStreet(e.target.value)}/></label>
                        <label>kod pocztowy firmy sprzedającego:<input type="text" value={sellercompanypostcode} onChange={(e) => setSellerCompanyPostCode(e.target.value)}/></label>
                        <label>miasto firmy sprzedającego:<input type="text" value={sellercompanycity} onChange={(e) => setSellerCompanyCity(e.target.value)}/></label>
                        <label>NIP firmy sprzedającego:<input type="text" value={sellercompanynip} onChange={(e) => setSellerCompanyNip(e.target.value)} /></label>
                        <label>REGON firmy sprzedającego:<input type="text" value={sellercompanyregon} onChange={(e) => setSellerCompanyRegon(e.target.value)} /></label>
                        <label>Aktualny numer jednostkowy faktur:<input type="text" value={invoicesactualnumber} onChange={(e) => setInvoicesActualNumber(e.target.value)} /></label>
                        <label>Stawka VAT:<input type="text" value={vatpercentage} onChange={(e) => setVatPercentage(e.target.value)} /></label>
                        <label>Podstawa zwolnienia z VAT, jeśli nie dotyczy zostaw pole puste lub wpisz "-" ":<input type="text" value={basisforvatexemption} onChange={(e) => setBasisForVatExemption(e.target.value)} /></label>
                        <button className="buttonToEdit">Zedytuj dane</button>
                    </form>
                </div>
            ): null}
            
            <h1>Faktury Admin</h1>
            {taxdatas.map(taxdata => (
                <div className="taxdatasPresentation" key={taxdata._id}>
                <h2>Dane profilu fakturowego sprzedającego:</h2>
                <p><strong>nazwa firmy sprzedającego:</strong> {taxdata.sellercompanyname}</p>
                <p><strong>adres (ulica i nr domu i mieszkania) firmy sprzedającego:</strong> {taxdata.sellercompanystreet}</p>
                <p><strong>kod pocztowy firmy sprzedającego:</strong> {taxdata.sellercompanypostcode}</p>
                <p><strong>miasto firmy sprzedającego:</strong> {taxdata.sellercompanycity}</p>
                <p><strong>NIP firmy sprzedającego:</strong> {taxdata.sellercompanynip}</p>
                <p><strong>REGON firmy sprzedającego:</strong> {taxdata.sellercompanyregon}</p>
                <p><strong>Aktualny numer jednostkowy faktur:</strong> {taxdata.invoicesactualnumber}</p>
                <p><strong>Stawka VAT:</strong> {taxdata.vatpercentage} %</p>
                <p><strong>Podstawa zwolnienia z VAT, jeśli nie dotyczy zostaw pole puste lub wpisz "-" ":</strong> {taxdata.basisforvatexemption} </p>
                <button className="buttonToEdit" onClick={() => handleEdit(taxdata._id, taxdata.sellercompanyname, taxdata.sellercompanystreet, taxdata.sellercompanypostcode, taxdata.sellercompanycity, taxdata.sellercompanynip, taxdata.sellercompanyregon, taxdata.invoicesactualnumber, taxdata.vatpercentage, taxdata.basisforvatexemption)}>Edytuj dane</button>
            </div>
            ))}
            <div>
                <h3 className="adminInfo1" style={{color: 'black'}}>Aktualny obrót w roku {new Date().getFullYear().toString()} to {totalamount} zł. Jeśli przekroczy 200 000 zł zmień stawkę VAT z 0 na 23% i ustaw podstawę zwolnienia z VAT na pusty string lub znak "-". </h3>
            </div>
            {isForm3Visible ? (<>
            <h1 style={{marginBottom: '10px', marginTop: '10px'}}>Wystaw fakturę korygującą</h1>
            <div className="editTaxDatasWrapper  handleAddCorrectiveInvoiceForm">
              <form onSubmit={handleAddCorrectiveInvoice}>


               
                <label>Powód korekty np. Zwrot produktu „Szkoła kontaktów” przez klienta w dniu 16.07.2025.<input type="text" value={correctionreason} onChange={(e) => setCorrectionreason(e.target.value)} /></label>
                <label>Pozycje korygowane (tabela JSON)
                  <br/>
                  Zawiera zakupione produkty w tablicy formacie JSON np.  jest tablica a wewnątrz jej obiekty (klamerka otwierająca i zamykająca)
                  <br/>
                  To co musisz zrobić to zostawić w tej tablicy produkt który ma być zwracany np. jeżeli 'React od podstaw' ktoś chce zwrócić to zostaw w tablicy tylko ten obiekt a inne obiekty pousuwaj.<br/>
                  Ten produkt będzie widniał jako przedmiot korekty faktury.<br/>
                  
                  <textarea style={{height: '120px'}} type="text" value={correcteditems} onChange={(e) => setCorrecteditems(e.target.value)}/></label>
                
                

                <button type="submit" className="buttonToEdit">Dodaj fakturę korygującą</button>
              </form>
              </div>



            </>) : null}



            {isForm2Visible ? (
            <div className="editTaxDatasWrapper editInvoiceDataWrapper">
            <form onSubmit={handleSubmit2}>
              <h1 style={{color: 'black'}}>Formularz korekcji faktury: </h1>
              <label>numer faktury: 
  <input 
    type="text" 
    value={correctioninvoicenumber} 
    onChange={(e) => setCorrectioninvoicenumber(e.target.value)} 
  />
</label>

<label>data wystawienia:
  <input 
    type="text" 
    value={correctiondateofissue} 
    onChange={(e) => setCorrectiondateofissue(e.target.value)} 
  />
</label>

<label>data sprzedaży:
  <input 
    type="text" 
    value={correctiondateofsale} 
    onChange={(e) => setCorrectiondateofsale(e.target.value)} 
  />
</label>

<label>nazwa firmy sprzedającego: 
  <input 
    type="text" 
    value={correctionsellercompanyname} 
    onChange={(e) => setCorrectionsellercompanyname(e.target.value)} 
  />
</label>

<label>adres firmy sprzedającego: 
  <input 
    type="text" 
    value={correctionsellercompanystreet} 
    onChange={(e) => setCorrectionsellercompanystreet(e.target.value)} 
  />
</label>

<label>kod pocztowy firmy sprzedającego: 
  <input 
    type="text" 
    value={correctionsellercompanypostcode} 
    onChange={(e) => setCorrectionsellercompanypostcode(e.target.value)} 
  />
</label>

<label>miasto firmy sprzedającego:
  <input 
    type="text" 
    value={correctionsellercompanycity} 
    onChange={(e) => setCorrectionsellercompanycity(e.target.value)} 
  />
</label>

<label>NIP firmy sprzedającego: 
  <input 
    type="text" 
    value={correctionsellercompanynip} 
    onChange={(e) => setCorrectionsellercompanynip(e.target.value)} 
  />
</label>

<label>REGON firmy sprzedającego:
  <input 
    type="text" 
    value={correctionsellercompanyregon} 
    onChange={(e) => setCorrectionsellercompanyregon(e.target.value)} 
  />
</label>

<label>imię klienta:
  <input 
    type="text" 
    value={correctioncustomername} 
    onChange={(e) => setCorrectioncustomername(e.target.value)} 
  />
</label>

<label>nazwisko klienta:
  <input 
    type="text" 
    value={correctioncustomersurname} 
    onChange={(e) => setCorrectioncustomersurname(e.target.value)} 
  />
</label>

<label>adres klienta ulica nr domu, nr mieszkania:
  <input 
    type="text" 
    value={correctioncustomerstreet} 
    onChange={(e) => setCorrectioncustomerstreet(e.target.value)} 
  />
</label>

<label>kod pocztowy klienta:
  <input 
    type="text" 
    value={correctioncustomerpostcode} 
    onChange={(e) => setCorrectioncustomerpostcode(e.target.value)} 
  />
</label>

<label>miasto klienta:
  <input 
    type="text" 
    value={correctioncustomercity} 
    onChange={(e) => setCorrectioncustomercity(e.target.value)} 
  />
</label>

<label>nazwa firmy klienta:
  <input 
    type="text" 
    value={correctioncustomercompanyname} 
    onChange={(e) => setCorrectioncustomercompanyname(e.target.value)} 
  />
</label>

<label>adres firmy klienta:
  <input 
    type="text" 
    value={correctioncustomercompanystreet} 
    onChange={(e) => setCorrectioncustomercompanystreet(e.target.value)} 
  />
</label>

<label>kod pocztowy firmy klienta:
  <input 
    type="text" 
    value={correctioncustomercompanypostcode} 
    onChange={(e) => setCorrectioncustomercompanypostcode(e.target.value)} 
  />
</label>

<label>miasto firmy klienta:
  <input 
    type="text" 
    value={correctioncustomercompanycity} 
    onChange={(e) => setCorrectioncustomercompanycity(e.target.value)} 
  />
</label>

<label>Czy chce fakturę?:
  <input 
    type="text" 
    value={correctioncustomerinvoice} 
    onChange={(e) => setCorrectioncustomerinvoice(e.target.value === 'true')} 
  />
</label>

<label>NIP firmy klienta:
  <input 
    type="text" 
    value={correctioncustomernip} 
    onChange={(e) => setCorrectioncustomernip(e.target.value)} 
  />
</label>

<label>REGON firmy klienta:
  <input 
    type="text" 
    value={correctioncustomerregon} 
    onChange={(e) => setCorrectioncustomerregon(e.target.value)} 
  />
</label>

<label>Treść zamówienia: 
  <input 
    type="text" 
    value={correctionordercontent} 
    onChange={(e) => setCorrectionordercontent(e.target.value)} 
  />
</label>

<label>Kwota zamówienia brutto:
  <input 
    type="text" 
    value={correctionorderamount} 
    onChange={(e) => setCorrectionorderamount(e.target.value)} 
  />
</label>

<label>Podstawa zwolnienia z VAT:
  <input 
    type="text" 
    value={correctionbasisofvatexemption} 
    onChange={(e) => Setcorrectionbasisofvatexemption(e.target.value)} 
  />
</label>

<label>Termin płatności:
  <input 
    type="text" 
    value={correctioninvoiceterm} 
    onChange={(e) => Setcorrectioninvoiceterm(e.target.value)} 
  />
</label>

<label>Czas zamówienia:
  <input 
    type="text" 
    value={correctionordertime} 
    onChange={(e) => Setcorrectionordertime(e.target.value)} 
  />
</label>

<label>Login:
  <input 
    type="text" 
    value={correctionlogin} 
    onChange={(e) => Setcorrectionlogin(e.target.value)} 
  />
</label>


              <button className="buttonToEdit">Skoryguj</button>
            </form>
            </div>
            ) : null}
            <div className="invoicesAdminPresentationList">
              <h1>Lista faktur: </h1>
              {invoices.map(invoice => (
              <div className="singleInvoice">
                <p><strong>numer faktury: </strong> {invoice.invoicenumber}</p>
                <p><strong>data wystawienia: </strong>{invoice.invoicedateofissue}</p>
                <p><strong>data sprzedaży: </strong>{invoice.dateofsale}</p>
                <p><strong>nazwa firmy sprzedającego: </strong>{invoice.sellercompanyname}</p>
                <p><strong>adres firmy sprzedającego: </strong>{invoice.sellercompanystreet}</p>
                <p><strong>kod pocztowy firmy sprzedającego: </strong>{invoice.sellercompanypostcode}</p>
                <p><strong>miasto firmy sprzedającego: </strong>{invoice.sellercompanycity}</p>
                <p><strong>NIP firmy sprzedającego: </strong>{invoice.sellercompanynip}</p>
                <p><strong>REGON firmy sprzedającego: </strong>{invoice.sellercompanyregon}</p>
                <p><strong>imię klienta: </strong>{invoice.customername}</p>
                <p><strong>nazwisko klienta: </strong>{invoice.customersurname}</p>
                <p><strong>adres klienta ulica nr domu, nr mieszkania: </strong>{invoice.customerstreet}</p>
                <p><strong>kod pocztowy klienta: </strong>{invoice.customerpostcode}</p>
                <p><strong>miasto klienta: </strong>{invoice.customercity}</p>
                <p><strong>nazwa firmy klienta: </strong>{invoice.customercompanyname}</p>
                <p><strong>adres firmy klienta: </strong>{invoice.customercompanystreet}</p>
                <p><strong>kod pocztowy firmy klienta: </strong>{invoice.customercompanypostcode}</p>
                <p><strong>miasto firmy klienta: </strong>{invoice.customercompanycity}</p>
                <p><strong>Czy chce fakturę?: </strong>{invoice.customerinvoice? 'tak': 'nie'}</p>
                <p><strong>NIP firmy klienta:</strong>{invoice.customercompanynip}</p>
                <p><strong>REGON firmy klienta:</strong>{invoice.customercompanyregon}</p>
             


 <p><strong>Treść zamówienia:</strong> </p>

               <table>
  <thead>
    <tr>
      <th>Tytuł</th>
      <th>Autor</th>
      <th>Cena brutto</th>
    </tr>
  </thead>
  <tbody>
    {JSON.parse(invoice.ordercontent).map((item, index) => (
      <tr key={index}>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.price} zł</td>
      </tr>
    ))}
  </tbody>
</table>
                
                <p><strong>Kwota zamówienia brutto: </strong>{invoice.orderamount}</p>
                <p><strong>Podstawa zwolnienia z VAT: </strong>{invoice.basisforvatexemption}</p>
                <p><strong>Termin płatności: </strong> {invoice.paymentterm}</p>
                <p><strong>Czas zamówienia: </strong>{invoice.ordertime}</p>
                <p><strong>Login:</strong>{invoice.login}</p>
                
                <button className="buttonToEdit" onClick={() => handleShowInvoice(
  invoice.invoicenumber,
  invoice.invoicedateofissue,
  invoice.dateofsale,
  invoice.sellercompanyname,
  invoice.sellercompanystreet,
  invoice.sellercompanypostcode,
  invoice.sellercompanycity,
  invoice.sellercompanynip,
  invoice.sellercompanyregon,
  invoice.customername,
  invoice.customersurname,
  invoice.customerstreet,
  invoice.customerpostcode,
  invoice.customercity,
  invoice.customercompanyname,
  invoice.customercompanystreet,
  invoice.customercompanypostcode,
  invoice.customercompanycity,
  invoice.customerinvoice,
  invoice.customercompanynip,
  invoice.customercompanyregon,
  invoice.ordercontent,
  invoice.orderamount,
  invoice.basisforvatexemption,
  invoice.paymentterm,
  invoice.ordertime,
  invoice.login
)}
>Zobacz fakturę</button>
<button className="buttonToEdit" onClick={() => handleCreateCorrectiveInvoice(invoice.invoicenumber, invoice.dateofsale, invoice.sellercompanyname, invoice.sellercompanystreet, invoice.sellercompanypostcode, invoice.sellercompanycity, invoice.sellercompanynip, invoice.sellercompanyregon, invoice.customername, invoice.customersurname, invoice.customerstreet, invoice.customerpostcode, invoice.customercity, invoice.customercompanyname, invoice.customercompanystreet, invoice.customercompanypostcode, invoice.customercompanycity, invoice.customerinvoice, invoice.customercompanynip, invoice.customercompanyregon, invoice.ordercontent, invoice.orderamount, invoice.basisforvatexemption, invoice.paymentterm, invoice.ordertime, invoice.login)}>Wystaw fakturę korygującą do tej faktury</button>
              </div>
              ))}
            </div>
            <div className="invoicesAdminPresentationList">
              <h1>Lista faktur korygujących: </h1>
              {correctives.map(corrective => (
              <div className="singleInvoice">
                <p><strong>numer faktury korygującej: </strong> {corrective.numberofcorrectiveinvoice}</p>
                <p><strong>data wystawienia faktury korygującej: {corrective.dateofissuecorrectiveinvoice}</strong></p>
                <p><strong>data sprzedaży:</strong> {corrective.dateofsale}</p>
                <p><strong>numer pierwotnej faktury: </strong> {corrective.numberofnativeinvoice}</p>
                <p><strong>nazwa firmy sprzedającego: </strong>{corrective.sellercompanyname}</p>
                <p><strong>adres firmy sprzedającego ulica nr mieszkania/nr domu: </strong>{corrective.sellercompanystreet}</p>
                <p><strong>kod pocztowy firmy sprzedającego: </strong>{corrective.sellercompanypostcode}</p>
                <p><strong>miasto firmy sprzedającego: </strong>{corrective.sellercompanycity}</p>
                <p><strong>NIP firmy sprzedającego: </strong>{corrective.sellercompanynip}</p>
                <p><strong>REGON firmy sprzedającego: </strong>{corrective.sellercompanyregon}</p>
                <p><strong>imię klienta: </strong>{corrective.customername}</p>
                <p><strong>nazwisko klienta: </strong>{corrective.customersurname}</p>
                <p><strong>ulica nr mieszkania/nr domu klienta: </strong>{corrective.customerstreet}</p>
                <p><strong>kod pocztowy klienta: </strong>{corrective.customerpostcode}</p>
                <p><strong>miasto klienta: </strong>{corrective.customercity}</p>
                <p><strong>nazwa firmy klienta: </strong>{corrective.customercompanyname}</p>
                <p><strong>adres firmy klienta ulica nr domu/nr mieszkania: </strong>{corrective.customercompanystreet}</p>
                <p><strong>kod pocztowy firmy klienta: </strong>{corrective.customercompanypostcode}</p>
                <p><strong>miasto firmy klienta: </strong>{corrective.customercompanycity}</p>
                <p><strong>czy chce fakturę?: </strong>{corrective.invoice ? 'TAK' : 'NIE'}</p>
                <p><strong>NIP firmy klienta: </strong>{corrective.customercompanynip}</p>
                <p><strong>REGON firmy klienta: </strong>{corrective.customercompanyregon}</p>
                <p><strong>Powód korekty: </strong>{corrective.correctionreason}</p>
                <p><strong>Zwracane produkty: </strong></p>
                <table>
  <thead>
    <tr>
      <th>L.p.</th>
      <th>Tytuł</th>
      <th>Autor</th>
      <th>Cena brutto</th>
    </tr>
  </thead>
  <tbody>
    {JSON.parse(corrective.correcteditems).map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.price} zł</td>
      </tr>
    ))}
  </tbody>
                </table>
                <p><strong>Podsumowanie: </strong>generuje system na fakturze korygującej</p>
                <p><strong>Kwota zamówienia z faktury pierwotnej: </strong>{corrective.orderamount}</p>
                <p><strong>Podstawa zwolnienia z VAT: </strong>{corrective.basisforvatexemption}</p>
                <p><strong>Termin płatności z faktury pierwotnej: </strong>{corrective.paymentterm}</p>
                <p><strong>Czas zamówienia z faktury pierwotnej: </strong>{corrective.ordertime}</p>
                <p><strong>Login klienta: </strong>{corrective.login}</p>
                
             

               <button className="buttonToEdit" onClick={() => viewCorrectiveInvoiceAsAdmin(corrective.numberofcorrectiveinvoice, corrective.dateofissuecorrectiveinvoice, corrective.dateofsale, corrective.numberofnativeinvoice, corrective.sellercompanyname, corrective.sellercompanystreet, corrective.sellercompanypostcode, corrective.sellercompanycity, corrective.sellercompanynip, corrective.sellercompanyregon, corrective.customername, corrective.customersurname, corrective.customerstreet, corrective.customerpostcode, corrective.customercity, corrective.customercompanyname, corrective.customercompanystreet, corrective.customercompanypostcode, corrective.customercompanycity, corrective.invoice, corrective.customercompanynip, corrective.customercompanyregon, corrective.correctionreason, corrective.correcteditems, corrective.summary, corrective.orderamount, corrective.basisforvatexemption, corrective.paymentterm, corrective.ordertime, corrective.login)
}>Zobacz fakturę korygującą</button>
                
            
     </div>
              ))}
            </div>

            <div className="invoicesAdminPresentationList">
              <h1>Wygeneruj raport zbiorczy faktur (faktury + faktury korygujące)</h1>
              <button className="buttonToEdit" onClick={generateReport}>Wygeneruj raport do wydruku</button>
            </div>
            
          </div>
        </div>
      ) : (
        <span>nie masz dostępu</span>
      )}
    </>
  );
};

export default InvoicesAdmin
