import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const InvoicesReport = () => {

    const navigate = useNavigate()
    const [invoices, setInvoices] = useState([]);
    const [correctives, setCorrectives] = useState([]);

    useEffect(() => {
        axios.get('https://platformaspedytor8-back.vercel.app/invoices')
            .then((response) => setInvoices(response.data))
            .catch((err) => console.log('error fetching invoices, error: ' + err));
    }, []);

    useEffect(() => {
        axios.get('https://platformaspedytor8-back.vercel.app/correctives')
            .then((response) => setCorrectives(response.data))
            .catch((err) => console.log('error fetching correctives, error: ' + err));
    }, []);




const handlePrint = () => {
    const views = Array.from(document.querySelectorAll('.singleInvoiceView'))
        .map((node) => node.outerHTML)
        .join('<div style="page-break-after: always;"></div>');

    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map((node) => node.outerHTML)
        .join('\n');

    const printWindow = window.open('', '', 'width=800,height=600');

    printWindow.document.write(`
        <html>
            <head>
                <title>Drukowanie faktur</title>
                ${styles}
                <style>
                    @media print {
                        .print-button, .buttonToEdit {
                            display: none !important;
                        }
                        .singleInvoiceView {
                            page-break-after: always;
                        }
                        body {
                            margin: 20px;
                            font-family: sans-serif;
                        }
                    }
                </style>
            </head>
            <body>
                ${views}
            </body>
        </html>
    `);

    printWindow.document.close();

    // Poczekaj aż wszystko się załaduje, zanim wywołasz drukowanie
    printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };
};



const handleGoToTheListOfInvoices = () => {
    navigate('/fakturyadmin')
}




    return (
        <div>
            <button onClick={handlePrint} className="buttonToEdit">Drukuj wszystkie faktury</button>
            <button onClick={handleGoToTheListOfInvoices} className="buttonToEdit">Powróć do listy faktur</button>

            <div className="invoicesReport">
                <h1>Raport zbiorczy (SPRAWDZIĆ CZY RAPORT GENERUJE SIĘ PRAWIDŁOWO)</h1>

                {invoices.map((invoice) => {
                    const items = JSON.parse(invoice.ordercontent).map((item) => ({
                        ...item,
                        price: Number(item.price),
                    }));

                    const totalprice = items.reduce((acc, item) => acc + item.price, 0);

                    return (
                        <div className="singleInvoiceView" key={invoice.invoicenumber}>
                            <div className="singleInvoiceForUserView">
                                <div className="firstDataInvoice">
                                    <h2>FAKTURA nr {invoice.invoicenumber}</h2>
                                    <h2>Data wystawienia: {invoice.invoicedateofissue}</h2>
                                    <h2>Data sprzedaży: {invoice.dateofsale}</h2>
                                </div>

                                <div className="secondDataInvoice">
                                    <div className="sellerdata">
                                        <h2>Sprzedawca</h2>
                                        <h3>{invoice.sellercompanyname}</h3>
                                        <h3>{invoice.sellercompanystreet} {invoice.sellercompanypostcode} {invoice.sellercompanycity}</h3>
                                        <h3>NIP: {invoice.sellercompanynip}</h3>
                                    </div>

                                    <div className="customerdata">
                                        <h2>Nabywca</h2>
                                        {invoice.sellercompanyname === '' || invoice.sellercompanynip === '' || !invoice.customerinvoice ? (
                                            <>
                                                <h3>{invoice.customername} {invoice.customersurname}</h3>
                                                <h3>ul. {invoice.customerstreet} {invoice.customerpostcode} {invoice.customercity}</h3>
                                            </>
                                        ) : (
                                            <>
                                                <h3>{invoice.customercompanyname}</h3>
                                                <h3>{invoice.customername} {invoice.customersurname}</h3>
                                                <h3>ul. {invoice.customercompanystreet} {invoice.customercompanypostcode} {invoice.customercompanycity}</h3>
                                                <h3>NIP: {invoice.customercompanynip}</h3>
                                            </>
                                        )}
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
                                            {items.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>1 szt.</td>
                                                    <td>
                                                        <p>
                                                            Cena jednostkowa netto:{' '}
                                                            {invoice.basisforvatexemption === '' || invoice.basisforvatexemption === '-' ? (
                                                                <>{(item.price / 1.23).toFixed(2)} zł</>
                                                            ) : (
                                                                <>{item.price.toFixed(2)} zł</>
                                                            )}
                                                        </p>
                                                        <p>
                                                            Stawka VAT:{' '}
                                                            {invoice.basisforvatexemption === '' || invoice.basisforvatexemption === '-' ? (
                                                                <>23%</>
                                                            ) : (
                                                                <>zwolnione (art. 113 ust. 1 ustawy o VAT)</>
                                                            )}
                                                        </p>
                                                        <p>
                                                            Kwota VAT:{' '}
                                                            {invoice.basisforvatexemption === '' || invoice.basisforvatexemption === '-' ? (
                                                                <>{(item.price - item.price / 1.23).toFixed(2)} zł</>
                                                            ) : (
                                                                <>0,00 zł</>
                                                            )}
                                                        </p>
                                                        <p>Cena jednostkowa brutto: {item.price.toFixed(2)} zł</p>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="fourthDataInvoice">
                                    <h3>Wartość do zapłaty: {totalprice.toFixed(2)} zł</h3>
                                    <h3>
                                        {invoice.basisforvatexemption !== '' && invoice.basisforvatexemption !== '-' && (
                                            <>Podstawa zwolnienia z VAT: {invoice.basisforvatexemption}</>
                                        )}
                                    </h3>
                                    <h3>Forma płatności: przelew</h3>
                                    <h3>Termin płatności: {invoice.paymentterm}</h3>
                                </div>

                                <div className="fifthDataInvoice">
                                    <div className="signseller">
                                        <h3>Podpis sprzedawcy:</h3>
                                        <h3>{invoice.sellercompanyname}</h3>
                                    </div>
                                    <div className="signbuyer">
                                        <h3>Podpis nabywcy:</h3>
                                        <h3>................................</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {correctives.map(corrective => {
                    const itemsArray = JSON.parse(corrective.correcteditems || '[]');
                    const totalPrice = -itemsArray.reduce((sum, item) => sum + parseFloat(item.price), 0);

                    return (
                        <div className="singleInvoiceView" key={corrective.numberofcorrectiveinvoice}>
                            <h1>Faktura korygująca nr {corrective.numberofcorrectiveinvoice}</h1>

                            <div className="singleInvoiceForUserView">
                                <div className="firstDataInvoice">
                                    <h2>FAKTURA KORYGUJĄCA nr {corrective.numberofcorrectiveinvoice}</h2>
                                    <h2>Data wystawienia: {corrective.dateofissuecorrectiveinvoice}</h2>
                                    <h2>Numer faktury korygowanej: {corrective.numberofnativeinvoice}</h2>
                                </div>
                                <div className="secondDataInvoice">
                                    <div className="sellerdata">
                                        <h2>Sprzedawca</h2>
                                        <h3>{corrective.sellercompanyname}</h3>
                                        <h3>{corrective.sellercompanystreet} {corrective.sellercompanypostcode} {corrective.sellercompanycity}</h3>
                                        <h3>NIP: {corrective.sellercompanynip}</h3>
                                    </div>
                                    <div className="customerdata">
                                        <h2>Nabywca</h2>
                                        {corrective.sellercompanyname === '' || corrective.sellercompanynip === '' || !corrective.invoice ? (
                                            <>
                                                <h3>{corrective.customername} {corrective.customersurname}</h3>
                                                <h3>ul. {corrective.customerstreet} {corrective.customerpostcode} {corrective.customercity}</h3>
                                            </>
                                        ) : (
                                            <>
                                                <h3>{corrective.customercompanyname}</h3>
                                                <h3>{corrective.customername} {corrective.customersurname}</h3>
                                                <h3>ul. {corrective.customerstreet} {corrective.customerpostcode} {corrective.customercity}</h3>
                                                <h3>NIP: {corrective.customercompanynip}</h3>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="thirdDataInvoice">
                                    <div className="correctionReason">
                                        <h1>Powód korekty</h1>
                                        <p>{corrective.correctionreason}</p>
                                    </div>
                                    <h1 style={{ marginTop: '30px' }}>Pozycja korygująca</h1>
                                    <table className="invoice-table">
                                        <thead>
                                            <tr>
                                                <th>L.p.</th>
                                                <th>Opis produktu lub usługi</th>
                                                <th>Ilość</th>
                                                <th>Cena jedn. netto</th>
                                                <th>Wartość netto</th>
                                                <th>Stawka VAT</th>
                                                <th>Kwota VAT</th>
                                                <th>Wartość brutto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {itemsArray.map((item, index) => {
                                                const price = parseFloat(item.price);
                                                const isVAT = corrective.basisforvatexemption === '' || corrective.basisforvatexemption === '-';
                                                const net = isVAT ? (price / 1.23) : price;
                                                const vatAmount = isVAT ? (price - price / 1.23) : 0;

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.title}</td>
                                                        <td>-1 szt.</td>
                                                        <td>{net.toFixed(2)} zł</td>
                                                        <td>{(-net).toFixed(2)} zł</td>
                                                        <td>{isVAT ? '23%' : '0%'}</td>
                                                        <td>{(-vatAmount).toFixed(2)} zł</td>
                                                        <td>{-price.toFixed(2)} zł</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>

                                    <h1>Podsumowanie</h1>
                                    <table className="invoice-table">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Netto</th>
                                                <th>VAT {corrective.basisforvatexemption === '' || corrective.basisforvatexemption === '-' ? 23 : 0}%</th>
                                                <th>Brutto</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td>{(corrective.basisforvatexemption === '' || corrective.basisforvatexemption === '-') ? (totalPrice / 1.23).toFixed(2) : totalPrice.toFixed(2)} zł</td>
                                                <td>{(corrective.basisforvatexemption === '' || corrective.basisforvatexemption === '-') ? (totalPrice * (0.23 / 1.23)).toFixed(2) : '0.00'} zł</td>
                                                <td>{totalPrice.toFixed(2)} zł</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default InvoicesReport;
