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




         <div style={{ padding: "16px" }}>
  <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>
    Statystyki wejść
  </h2>
  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      border: "1px solid #d1d5db" // szary border (gray-300)
    }}
  >
    <thead>
      <tr style={{ backgroundColor: "#f3f4f6" /* gray-100 */ }}>
        <th
          style={{
            border: "1px solid #d1d5db",
            padding: "8px",
            textAlign: "left"
          }}
        >
          Źródło
        </th>
        <th
          style={{
            border: "1px solid #d1d5db",
            padding: "8px",
            textAlign: "left"
          }}
        >
          Wejścia
        </th>
      </tr>
    </thead>
    <tbody>
      {stats.map((item) => (
        <tr key={item._id}>
          <td
            style={{
              border: "1px solid #d1d5db",
              padding: "8px"
            }}
          >
            {item.source}
          </td>
          <td
            style={{
              border: "1px solid #d1d5db",
              padding: "8px"
            }}
          >
            {item.count}
          </td>
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
