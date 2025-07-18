import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

const MyInvoices = () => {
  const [userinvoices, setUserInvoices] = useState([]);
  const [login, setLogin] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [correctives, setCorrectives] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()


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





  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  }

  useEffect(() => {
    const cookie = getCookie('user');

    if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      setLogin(loginFromCookie);
      setHasAccess(true);

      axios
        .get('http://localhost:5000/invoices')
        .then((response) => {
          const foundInvoices = response.data.filter(invoice => invoice.login === loginFromCookie);
          setUserInvoices(foundInvoices);
        })
        .catch((err) => console.error('Error fetching invoices:', err));
    } else {
      setHasAccess(false);
    }
  }, []);



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
  navigate('/faktura')
};


useEffect(() => {

  const cookie = getCookie('user');


if (cookie) {
      const loginFromCookie = cookie.split(';')[0];
      setLogin(loginFromCookie);
      setHasAccess(true);
 axios.get('http://localhost:5000/correctives')
    .then((response) => {
      const foundCorrectives = response.data.filter(corrective => corrective.login === loginFromCookie);
      setCorrectives(foundCorrectives);
    })
    .catch((err) => console.log('error fetching correctives', err));
      
    } else {
      setHasAccess(false);
    }




 
}, []);




const handleShowCorrectiveInvoice = (corusnumberofcorrectiveinvoice,
     corusdateofissuecorrectiveinvoice,
    corusdateofsale,
    corusnumberofnativeinvoice,
        corussellercompanyname,
         corussellercompanystreet,
          corussellercompanypostcode,
           corussellercompanycity,
            corussellercompanynip,
            corussellercompanyregon,
            coruscustomername,
            coruscustomersurname, 
            coruscustomerstreet,
            coruscustomerpostcode,
            coruscustomercity,
            coruscustomercompanyname,
            coruscustomercompanystreet,
            coruscustomercompanypostcode,
            coruscustomercompanycity,
            corusinvoice,
            coruscustomercompanynip,
            coruscustomercompanyregon,
            coruscorrectionreason,
            coruscorrecteditems,
            corussummary,
            corusorderamount,
            corusbasisforvatexemption,
            coruspaymentterm,
            corusordertime,
            coruslogin
 ) => {

dispatch({
    type: 'CHANGE_COR_USER',
    corusnumberofcorrectiveinvoice,
     corusdateofissuecorrectiveinvoice,
    corusdateofsale,
    corusnumberofnativeinvoice,
        corussellercompanyname,
         corussellercompanystreet,
          corussellercompanypostcode,
           corussellercompanycity,
            corussellercompanynip,
            corussellercompanyregon,
            coruscustomername,
            coruscustomersurname, 
            coruscustomerstreet,
            coruscustomerpostcode,
            coruscustomercity,
            coruscustomercompanyname,
            coruscustomercompanystreet,
            coruscustomercompanypostcode,
            coruscustomercompanycity,
            corusinvoice,
            coruscustomercompanynip,
            coruscustomercompanyregon,
            coruscorrectionreason,
            coruscorrecteditems,
            corussummary,
            corusorderamount,
            corusbasisforvatexemption,
            coruspaymentterm,
            corusordertime,
            coruslogin
  });
navigate('/fakturakorygujaca')

} 





  return (
    <div className="app">
      <Header />
      <div className="myOrdersPresentation myInvoicesPresentation">
        {hasAccess ? (
          <>
            <h1>Moje faktury (opłacone)</h1>
            {login && userinvoices.length > 0 ? (
              userinvoices
                .slice()
                .reverse()
                .map((invoice) => (
                  <div className="myOrdersPresentationItem myInvoicesPresentationItem" key={invoice._id}>
                    <h4>numer systemowy faktury: {invoice.invoicenumber}</h4>
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
                   
                  </div>
                ))
            ) : (
              <p>Ładowanie danych...</p>
            )}
            {correctives.length > 0 ? (<h1>Moje faktury korygujące</h1>) : null}
            {correctives.map(corrective => (
              <div className="myOrdersPresentationItem myInvoicesPresentationItem CorrectiveItemsPresentationForUser">
                <h4>numer systemowy faktury: {corrective.numberofcorrectiveinvoice}</h4>
                <button className="buttonToEdit" onClick={() => handleShowCorrectiveInvoice(corrective.numberofcorrectiveinvoice,
     corrective.dateofissuecorrectiveinvoice,
      corrective.dateofsale,
       corrective.numberofnativeinvoice,
        corrective.sellercompanyname,
         corrective.sellercompanystreet,
          corrective.sellercompanypostcode,
           corrective.sellercompanycity,
            corrective.sellercompanynip,
            corrective.sellercompanyregon,
            corrective.customername,
            corrective.customersurname, 
            corrective.customerstreet,
            corrective.customerpostcode,
            corrective.customercity,
            corrective.customercompanyname,
            corrective.customercompanystreet,
            corrective.customercompanypostcode,
            corrective.customercompanycity,
            corrective.invoice,
            corrective.customercompanynip,
            corrective.customercompanyregon,
            corrective.correctionreason,
            corrective.correcteditems,
            corrective.summary,
            corrective.orderamount,
            corrective.basisforvatexemption,
            corrective.paymentterm,
            corrective.ordertime,
            corrective.login
        
        )}>Zobacz fakturę korygującą</button>
              </div>

            ))}
           
          </>
        ) : (
          <h2>Nie masz dostępu</h2>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyInvoices;
