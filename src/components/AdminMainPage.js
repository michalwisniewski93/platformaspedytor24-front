import React from 'react'
import { useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import AdminWidgetToLogOut from './AdminWidgetToLogOut'


const AdminMainPage = () => {

    

    const isAdminLogged = useSelector(state => state.isAdminLogged)

   

    

    return (
        <>
        {isAdminLogged ? 
        <div className="adminKokpit">
            <AdminWidgetToLogOut/>
            <div className="adminOption">
                <nav>
                    <ul>
                        <li><Link to="/messages">Wiadomości ze strony kontakt</Link></li>
                        <li><Link to="/blogadmin">Blog</Link></li>
                        <li><Link to="/stronysprzedazowekursowadmin">Strony sprzedażowe i treść kursów</Link></li>
                        <li><Link to="/klienciadmin">Klienci</Link></li>
                        <li><Link to="/zamowieniaadmin">Zamówienia</Link></li>
                        <li><Link to="/fakturyadmin">Faktury</Link></li>
                        <li><Link to="/marketing-tracker">Marketing Tracker</Link></li>
                    </ul>
                </nav>
            </div>
        </div> 
        : <span>nie masz dostępu</span>}
        </>
    )
}

export default AdminMainPage
