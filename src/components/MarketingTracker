import React, {useState, useEffect} from 'react'
import AdminWidgetToLogOut from './AdminWidgetToLogOut';
import { useSelector } from 'react-redux';




const MarketingTracker = () => {

     const isAdminLogged = useSelector(state => state.isAdminLogged)
const [stats, setStats] = useState([]);

useEffect(() => {
    fetch("https://platformaspedytor8-back-production.up.railway.app/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Błąd pobierania statystyk:", err));
  }, []);





    return (
            <>
            {isAdminLogged ? 
            <div className="adminKokpit">
                <AdminWidgetToLogOut/>
                <div className="clientsAdminWrapper">
                    <h1>Marketing Tracker</h1>


 <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Statystyki wejść</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Źródło</th>
            <th className="border border-gray-300 p-2">Wejścia</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((item) => (
            <tr key={item._id}>
              <td className="border border-gray-300 p-2">{item.source}</td>
              <td className="border border-gray-300 p-2">{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>




                   
                </div>
            </div> 
            : <span>nie masz dostępu</span>}
            </>
        )
}

export default MarketingTracker;
