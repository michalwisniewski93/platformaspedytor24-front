import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CorrectiveUserInvoiceView = () => {
  const navigate = useNavigate()
  const [hasAccess, setHasAccess] = useState(true)

  const corusnumberofcorrectiveinvoice = useSelector(state => state.corusnumberofcorrectiveinvoice)
  const corusdateofissuecorrectiveinvoice = useSelector(state => state.corusdateofissuecorrectiveinvoice)
  const corusdateofsale = useSelector(state => state.corusdateofsale)
  const corusnumberofnativeinvoice = useSelector(state => state.corusnumberofnativeinvoice)
  const corussellercompanyname = useSelector(state => state.corussellercompanyname)
  const corussellercompanystreet = useSelector(state => state.corussellercompanystreet)
  const corussellercompanypostcode = useSelector(state => state.corussellercompanypostcode)
  const corussellercompanycity = useSelector(state => state.corussellercompanycity)
  const corussellercompanynip = useSelector(state => state.corussellercompanynip)
  const corussellercompanyregon = useSelector(state => state.corussellercompanyregon)
  const coruscustomername = useSelector(state => state.coruscustomername)
  const coruscustomersurname = useSelector(state => state.coruscustomersurname)
  const coruscustomerstreet = useSelector(state => state.coruscustomerstreet)
  const coruscustomerpostcode = useSelector(state => state.coruscustomerpostcode)
  const coruscustomercity = useSelector(state => state.coruscustomercity)
  const coruscustomercompanyname = useSelector(state => state.coruscustomercompanyname)
  const coruscustomercompanystreet = useSelector(state => state.coruscustomercompanystreet)
  const coruscustomercompanypostcode = useSelector(state => state.coruscustomercompanypostcode)
  const coruscustomercompanycity = useSelector(state => state.coruscustomercompanycity)
  const corusinvoice = useSelector(state => state.corusinvoice)
  const coruscustomercompanynip = useSelector(state => state.coruscustomercompanynip)
  const coruscustomercompanyregon = useSelector(state => state.coruscustomercompanyregon)
  const coruscorrectionreason = useSelector(state => state.coruscorrectionreason)
  const coruscorrecteditems = useSelector(state => state.coruscorrecteditems)
  const corussummary = useSelector(state => state.corussummary)
  const corusorderamount = useSelector(state => state.corusorderamount)
  const corusbasisforvatexemption = useSelector(state => state.corusbasisforvatexemption)
  const coruspaymentterm = useSelector(state => state.coruspaymentterm)
  const corusordertime = useSelector(state => state.corusordertime)
  const coruslogin = useSelector(state => state.coruslogin)

  const login = useSelector((state) => state.coruslogin)

  const itemsArray = JSON.parse(coruscorrecteditems || '[]')
  const totalPrice = (
    -itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0)
  ).toFixed(2)

  useEffect(() => {
    if (corusnumberofnativeinvoice === '') {
      navigate('/moje-faktury')
    }
  }, [])

  const handleGoToList = () => {
    navigate('/moje-faktury')
  }

  const handlePrint = () => {
    const content = document.querySelector('.singleInvoiceView').innerHTML
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('\n')

    const printWindow = window.open('', '', 'width=800,height=600')
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
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
  }

  return (
    <div className="app">
      <div className="singleInvoiceView">
        {hasAccess ? (
          <>
            <h1>Faktura korygująca nr {corusnumberofcorrectiveinvoice}</h1>

            <div className="singleInvoiceForUserView">
              <div className="firstDataInvoice">
                <h2>FAKTURA KORYGUJĄCA nr {corusnumberofcorrectiveinvoice}</h2>
                <h2>Data wystawienia: {corusdateofissuecorrectiveinvoice}</h2>
                <h2>Numer faktury korygowanej: {corusnumberofnativeinvoice}</h2>
                 <h2>metoda kasowa</h2>
              </div>
              <div className="secondDataInvoice">
                <div className="sellerdata">
                  <h2>Sprzedawca</h2>
                  <h3>{corussellercompanyname}</h3>
                  <h3>{corussellercompanystreet} {corussellercompanypostcode} {corussellercompanycity}</h3>
                  <h3>NIP: {corussellercompanynip}</h3>
                </div>
                <div className="customerdata">
                  <h2>Nabywca</h2>
                  {corussellercompanyname === '' || corussellercompanynip === '' || !corusinvoice ? (
                    <>
                      <h3>{coruscustomername} {coruscustomersurname}</h3>
                      <h3>ul. {coruscustomerstreet} {coruscustomerpostcode} {coruscustomercity}</h3>
                    </>
                  ) : (
                    <>
                      <h3>{coruscustomercompanyname}</h3>
                      <h3>{coruscustomername} {coruscustomersurname}</h3>
                      <h3>ul. {coruscustomerstreet} {coruscustomerpostcode} {coruscustomercity}</h3>
                      <h3>NIP: {coruscustomercompanynip}</h3>
                    </>
                  )}
                </div>
              </div>
              <div className="thirdDataInvoice">
                <div className="correctionReason">
                  <h1>Powód korekty</h1>
                  <p>{coruscorrectionreason}</p>
                </div>
                <h1 style={{ marginTop: '30px' }}>Pozycja korygująca</h1>
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
                        <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? (item.price / 1.23).toFixed(2) : item.price} zł </td>
                        <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? (-item.price / 1.23).toFixed(2) : -item.price} zł </td>
                        <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? 23 : 0} %</td>
                        <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? (-(item.price * 0.23 / 1.23)).toFixed(2) : 0} zł</td>
                        <td>{-item.price} zł</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h1>Podsumowanie</h1>
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Netto</th>
                      <th>VAT {corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? 23 : 0} %</th>
                      <th>Brutto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? (totalPrice / 1.23).toFixed(2) : totalPrice} zł</td>
                      <td>{corusbasisforvatexemption === '' || corusbasisforvatexemption === '-' ? (totalPrice * (0.23 / 1.23)).toFixed(2) : 0} zł</td>
                      <td>{totalPrice} zł</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <h2>Nie masz dostępu</h2>
        )}
      </div>
      <button className="buttonToEdit" onClick={handlePrint}>Drukuj fakturę</button>
      <button className="buttonToEdit" onClick={handleGoToList}>Lista faktur</button>
    </div>
  )
}

export default CorrectiveUserInvoiceView
