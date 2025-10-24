import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {logout} from "../api/auth";

const AdminWidgetToLogOut = () => {

    const dispatch = useDispatch()
    const isAdminLogged = useSelector(state => state.isAdminLogged)
    const changeAdminLogged = () => dispatch({type: 'CHANGE_ADMIN_LOGGED'})
    const navigate = useNavigate()

    const handleLogOut = async () => {
        changeAdminLogged()
        await logout();
    }

    const handleGoToHomeAdmin = () => {
        navigate('/admin-main-page')
    }


    return(
        <div className="loginPanelAdminLogOut">
                  <button onClick={handleGoToHomeAdmin}>Strona główna panelu admina</button>
                 {isAdminLogged ? <button onClick={handleLogOut}>{String.fromCodePoint(0x1F680)} Wyloguj się</button> : null}
        </div>
    )
}
export default AdminWidgetToLogOut