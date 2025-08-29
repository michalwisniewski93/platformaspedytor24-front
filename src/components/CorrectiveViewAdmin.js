import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CorrectiveViewAdmin = () => {

  const navigate = useNavigate()

    const [hasAccess, setHasAccess] = useState(true)

const coradminnumberofcorrectiveinvoice = useSelector(state => state.coradminnumberofcorrectiveinvoice)
const coradmindateofissuecorrectiveinvoice = useSelector(state => state.coradmindateofissuecorrectiveinvoice)
const coradmindateofsale = useSelector(state => state.coradmindateofsale)
const coradminnumberofnativeinvoice = useSelector(state => state.coradminnumberofnativeinvoice)
const coradminsellercompanyname = useSelector(state => state.coradminsellercompanyname)
const coradminsellercompanystreet = useSelector(state => state.coradminsellercompanystreet)
const coradminsellercompanypostcode = useSelector(state => state.coradminsellercompanypostcode)
const coradminsellercompanycity = useSelector(state => state.coradminsellercompanycity)
const coradminsellercompanynip = useSelector(state => state.coradminsellercompanynip)
const coradminsellercompanyregon = useSelector(state => state.coradminsellercompanyregon) 
const coradmincustomername = useSelector(state => state.coradmincustomername)
const coradmincustomersurname = useSelector(state => state.coradmincustomersurname)
const coradmincustomerstreet = useSelector(state => state.coradmincustomerstreet)
const coradmincustomerpostcode = useSelector(state => state.coradmincustomerpostcode)
const coradmincustomercity = useSelector(state => state.coradmincustomercity)
const coradmincustomercompanyname = useSelector(state => state.coradmincustomercompanyname)
const coradmincustomercompanystreet = useSelector(state => state.coradmincustomercompanystreet)
const coradmincustomercompanypostcode = useSelector(state => state.coradmincustomercompanypostcode)
const coradmincustomercompanycity = useSelector(state => state.coradmincustomercompanycity)
const coradmininvoice = useSelector(state => state.coradmininvoice)
const coradmincustomercompanynip = useSelector(state => state.coradmincustomercompanynip)
const coradmincustomercompanyregon = useSelector(state => state.coradmincustomercompanyregon)
const coradmincorrectionreason = useSelector(state => state.coradmincorrectionreason)
const coradmincorrecteditems = useSelector(state => state.coradmincorrecteditems)
const coradminsummary = useSelector(state => state.coradminsummary)
const coradminorderamount = useSelector(state => state.coradminorderamount)
const coradminbasisforvatexemption = useSelector(state => state.coradminbasisforvatexemption)
const coradminpaymentterm = useSelector(state => state.coradminpaymentterm)
const coradminordertime = useSelector(state => state.coradminordertime)
const coradminlogin = useSelector(state => state.coradminlogin)


const login = useSelector((state) => state.coradminlogin);

const itemsArray = JSON.parse(coradmincorrecteditems || '[]');
const totalPrice = (-(itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0))).toFixed(2);



useEffect(() => {
  if(coradminnumberofnativeinvoice === ''){
    navigate('/fakturyadmin')
  }
}, [])


const handleGoToList = () => {
  navigate('/fakturyadmin')
}



const handlePrint = () => {
  const content = document.querySelector('.singleInvoiceView').innerHTML;
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join('\n');

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Drukowanie faktury</title>
        ${styles}
        <style>
          @media print {
            .print-button, .buttonToEdit {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="singleInvoiceView">
          ${content}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};



    return(
         <div className="app">
     
      <div className="singleInvoiceView">
        {hasAccess ? (
          <>
            <h1>Faktura korygująca nr {coradminnumberofcorrectiveinvoice}</h1>
            
            {true ? (
              
              <div className="singleInvoiceForUserView">
                <div className="firstDataInvoice">
                        <h2>FAKTURA KORYGUJĄCA nr {coradminnumberofcorrectiveinvoice}</h2>
                        <h2>Data wystawienia: {coradmindateofissuecorrectiveinvoice}</h2> 
                        <h2>Numer faktury korygowanej: {coradminnumberofnativeinvoice}</h2> 
                         <h2>metoda kasowa</h2>
                </div>
                <div className="secondDataInvoice">
                    <div className="sellerdata">
                        <h2>Sprzedawca</h2>
                        <h3>{coradminsellercompanyname}</h3>
                        <h3>{coradminsellercompanystreet} {coradminsellercompanypostcode} {coradminsellercompanycity}</h3>
                        <h3>NIP: {coradminsellercompanynip}</h3>
                    </div>
                    <div className="customerdata">
                        <h2>Nabywca</h2>
                        {coradminsellercompanyname === '' || coradminsellercompanynip === '' || !coradmininvoice ? (
                            <>
                            <h3>{coradmincustomername} {coradmincustomersurname}</h3>
                            <h3>ul. {coradmincustomerstreet} {coradmincustomerpostcode} {coradmincustomercity}</h3>
                            </>
                        ) : (
                            <>
                            <h3>{coradmincustomercompanyname}</h3>
                            <h3>{coradmincustomername} {coradmincustomersurname}</h3>
                            <h3>ul. {coradmincustomerstreet} {coradmincustomerpostcode} {coradmincustomercity}</h3>
                            <h3>NIP: {coradmincustomercompanynip}</h3>
                            </>
                        ) }
                    </div>
                </div>
                <div className="thirdDataInvoice">
                <div className="correctionReason">
                    <h1>Powód korekty</h1>
                    <p>{coradmincorrectionreason}</p>
                </div>
                <h1 style={{marginTop: '30px'}}>Pozycja korygująca</h1>
           <table className="invoice-table">
  <thead>
    <tr>
      <th>L.p.</th>
      <th>Opis produktu lub usługi</th>
      <th>Ilość</th>
      <th>Cena jedn. netto</th>
      <th>Wartość netto: </th>
      <th>Stawka VAT</th>
      <th>Kwota VAT</th>
      <th>Wartość brutto</th>
     
    </tr>
  </thead>
 <tbody>
  {(itemsArray || []).map((item, index) => (
    
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>-1 szt.</td>
        <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? (item.price/1.23).toFixed(2): item.price} zł </td>
        <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? (-item.price/1.23).toFixed(2): -item.price} zł </td> 
        <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? 23: 0} %</td>
        <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? (-(item.price * 0.23 / 1.23)).toFixed(2): 0} zł</td>
       
        <td>{-item.price} zł</td>
        
      </tr>
    ))}
  </tbody>
</table>
<h1>Podsumowanie</h1>
<table className="invoice-table">
  <thead>
    <th></th>
    <th>Netto</th>
    <th>VAT {coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? 23 : 0} %</th>
    <th>Brutto</th>
  </thead>
  <tbody>
    <td></td>
    <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? (totalPrice/1.23).toFixed(2): totalPrice} zł</td>
    <td>{coradminbasisforvatexemption === '' || coradminbasisforvatexemption === '-' ? (totalPrice*(0.23/1.23)).toFixed(2): 0} zł</td>
    <td>{totalPrice} zł</td>
  </tbody>
</table>

                </div>
           
               
                
              </div>
            ) : (
              <p>Ładowanie danych...</p>
            )}
          </>
        ) : (
          <h2>Nie masz dostępu</h2>
        )}
      </div>
      <button  className="buttonToEdit" onClick={handlePrint}>Drukuj fakturę</button>
      <button  className="buttonToEdit" onClick={handleGoToList}>Lista faktur</button>
     
    </div>
        
    )
}


export default CorrectiveViewAdmin
