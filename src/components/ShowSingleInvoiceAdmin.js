import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'



const ShowSingleInvoiceAdmin = () => {
const navigate = useNavigate()


    
    


      const [totalprice, setTotalPrice] = useState(0)

      const [hasAccess, setHasAccess] = useState(true)


 





 


const invoicenumber = useSelector((state) => state.invoicenumber);
const invoicedateofissue = useSelector((state) => state.invoicedateofissue);
const dateofsale = useSelector((state) => state.dateofsale);

const sellercompanyname = useSelector((state) => state.sellercompanyname);
const sellercompanystreet = useSelector((state) => state.sellercompanystreet);
const sellercompanypostcode = useSelector((state) => state.sellercompanypostcode);
const sellercompanycity = useSelector((state) => state.sellercompanycity);
const sellercompanynip = useSelector((state) => state.sellercompanynip);
const sellercompanyregon = useSelector((state) => state.sellercompanyregon);

const customername = useSelector((state) => state.customername);
const customersurname = useSelector((state) => state.customersurname);
const customerstreet = useSelector((state) => state.customerstreet);
const customerpostcode = useSelector((state) => state.customerpostcode);
const customercity = useSelector((state) => state.customercity);

const customercompanyname = useSelector((state) => state.customercompanyname);
const customercompanystreet = useSelector((state) => state.customercompanystreet);
const customercompanypostcode = useSelector((state) => state.customercompanypostcode);
const customercompanycity = useSelector((state) => state.customercompanycity);
const customerinvoice = useSelector((state) => state.customerinvoice);
const customercompanynip = useSelector((state) => state.customercompanynip);
const customercompanyregon = useSelector((state) => state.customercompanyregon);

const ordercontent = useSelector((state) => state.ordercontent);
const orderamount = useSelector((state) => state.orderamount);
const basisforvatexemption = useSelector((state) => state.basisforvatexemption);
const paymentterm = useSelector((state) => state.paymentterm);
const ordertime = useSelector((state) => state.ordertime);

const login = useSelector((state) => state.login);


    useEffect(() => {
    if (ordercontent) {
      try {
        const items = JSON.parse(ordercontent);
        const sum = items.reduce((acc, item) => acc + Number(item.price), 0);
        setTotalPrice(sum);
      } catch (error) {
        console.error("Błąd parsowania ordercontent:", error);
      }
    }
  }, [ordercontent]);

const handlePrintOld = () => {
  const printContents = document.querySelector('.singleInvoiceView').innerHTML;
  const originalContents = document.body.innerHTML;

  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload(); // przeładuj stronę, żeby wszystko wróciło
};

const handlePrintOld2 = () => {
  const content = document.querySelector('.singleInvoiceView').innerHTML;

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>Drukowanie faktury</title>
        <style>
          @page {
            size: A4;
            margin: 1cm;
          }

          body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          h1, h2, h3 {
            margin: 4px 0;
            padding: 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 10px;
          }

          th, td {
            border: 1px solid #aaa;
            padding: 4px 6px;
            vertical-align: top;
            text-align: left;
          }

          th {
            background-color: #eee;
          }

          .singleInvoiceView {
            max-width: 100%;
            page-break-inside: avoid;
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





const handleGoToList = () => {
  navigate('/fakturyadmin')
}


   return (
    <div className="app">
     
      <div className="singleInvoiceView">
        {hasAccess ? (
          <>
            <h1>Faktura nr {invoicenumber}</h1>
            {login ? (
              
              <div className="singleInvoiceForUserView">
                <div className="firstDataInvoice">
                        <h2>FAKTURA nr {invoicenumber}</h2>
                        <h2>Data wystawienia: {invoicedateofissue}</h2> 
                        <h2>Data sprzedaży: {dateofsale}</h2> 
                        <h2>metoda kasowa</h2>
                </div>
                <div className="secondDataInvoice">
                    <div className="sellerdata">
                        <h2>Sprzedawca</h2>
                        <h3>{sellercompanyname}</h3>
                        <h3>{sellercompanystreet} {sellercompanypostcode} {sellercompanycity}</h3>
                        <h3>NIP: {sellercompanynip}</h3>
                    </div>
                    <div className="customerdata">
                        <h2>Nabywca</h2>
                        {sellercompanyname === '' || sellercompanynip === '' || !customerinvoice ? (
                            <>
                            <h3>{customername} {customersurname}</h3>
                            <h3>ul. {customerstreet} {customerpostcode} {customercity}</h3>
                            </>
                        ) : (
                            <>
                            <h3>{customercompanyname}</h3>
                            <h3>{customername} {customersurname}</h3>
                            <h3>ul. {customercompanystreet} {customercompanypostcode} {customercompanycity}</h3>
                            <h3>NIP: {customercompanynip}</h3>
                            </>
                        ) }
                    </div>
                </div>
                <div className="thirdDataInvoice">
           <table className="invoice-table">
  <thead>
    <tr>
      <th>L.p.</th>
      <th>Opis produktu lub usługi</th>
      <th>Ilość</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {JSON.parse(ordercontent).map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td> {/* L.p. */}
        <td>{item.title}</td>
        <td>1 szt.</td>
        <td>


<p>Cena jednostkowa netto: {basisforvatexemption === '' || basisforvatexemption === '-' ? (<>{(item.price/1.23).toFixed(2)} zł</>) : (<>{item.price} zł</>)} </p>
<p>Stawka VAT: {basisforvatexemption === '' || basisforvatexemption === '-' ? (<>23%</>) : (<>zwolnione (art. 113 ust. 1 ustawy o VAT)</>)}</p>
<p>Kwota VAT: {basisforvatexemption === '' || basisforvatexemption === '-' ? (<>{(item.price - (item.price/1.23)).toFixed(2)} zł</>) : (<>0,00 zł</>)}</p>         
<p>Cena jednostkowa brutto: {item.price} zł</p>



        </td>
      </tr>
    ))}
  </tbody>
</table>

                </div>
                <div className="fourthDataInvoice">
                <h3>Wartość do zapłaty: {totalprice} zł</h3>
                <h3>{basisforvatexemption === '' || basisforvatexemption === '-' ? (<></>) : (<>Podstawa zwolnienia z VAT: {basisforvatexemption}</>)}</h3>
                <h3>Forma płatności: przelew</h3>
                <h3>Termin płatności: {paymentterm}</h3>
                
                </div>
                <div className="fifthDataInvoice">
                    <div className="signseller">
                        <h3>Podpis sprzedawcy:</h3>
                        <h3>{sellercompanyname}</h3>
                    </div>
                    <div className="signbuyer">
                        <h3>Podpis nabywcy:</h3>
                        <h3>................................</h3>
                    </div>
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
      <button onClick={handlePrint} className="buttonToEdit">Drukuj fakturę</button>
      <button onClick={handleGoToList} className="buttonToEdit">Lista faktur</button>
     
    </div>
  );
};



export default ShowSingleInvoiceAdmin
