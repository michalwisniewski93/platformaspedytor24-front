import React, {useState} from 'react'
import { useSelector } from 'react-redux'


const CorrectiveViewAdmin = () => {

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


    return(
         <div className="app">
     
      <div className="singleInvoiceView">
        {hasAccess ? (
          <>
            <h1>Faktura korygująca nr {coradminnumberofcorrectiveinvoice}</h1>
            <h1>{login}</h1>
            {true ? (
              
              <div className="singleInvoiceForUserView">
                <div className="firstDataInvoice">
                        <h2>FAKTURA KORYGUJĄCA nr {coradminnumberofcorrectiveinvoice}</h2>
                        <h2>Data wystawienia: {coradmindateofissuecorrectiveinvoice}</h2> 
                        <h2>Numer faktury korygowanej: {coradminnumberofnativeinvoice}</h2> 
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
    {JSON.parse(coradmincorrecteditems).map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.title}</td>
        <td>1 szt.</td>
        <td>cena jedn. netto</td>
        <td>wartość netto</td>
        <td>stawka vat</td>
        <td>kwota vat</td>
        <td>wartość brutto</td>
        
      </tr>
    ))}
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
      <button  className="buttonToEdit">Drukuj fakturę</button>
      <button  className="buttonToEdit">Lista faktur</button>
     
    </div>
        
    )
}


export default CorrectiveViewAdmin