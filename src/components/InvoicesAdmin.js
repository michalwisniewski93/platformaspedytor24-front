import React, { useState, useEffect } from 'react';
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';
import axios from 'axios';

const InvoicesAdmin = () => {
 
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


  
     useEffect(() => {
        axios.get('http://localhost:5000/taxdatas')
        .then((response) => setTaxdatas(response.data))
        .catch((err) => console.log('error fetching taxdatas, error: ' + err))
    }, [])



useEffect(() => {
  axios.get('http://localhost:5000/orders')
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

  axios.put(`http://localhost:5000/taxdatas/${editingId}`, {
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
            
          </div>
        </div>
      ) : (
        <span>nie masz dostępu</span>
      )}
    </>
  );
};

export default InvoicesAdmin;
