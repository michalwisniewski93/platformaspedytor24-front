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
        .get('https://platformaspedytor8-back-production.up.railway.app/invoices')
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
 axios.get('https://platformaspedytor8-back-production.up.railway.app/correctives')
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
    <p>Obecnie faktury wysyłamy Tobie drogą mailową.</p>
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
