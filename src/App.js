import React, {useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import MainSite from './components/MainSite'
import AboutUs from './components/AboutUs'
import Blog from './components/Blog'
import Courses from './components/Courses';
import Contact from './components/Contact';
import Regulations from './components/Regulations'
import PrivacyPolicy from './components/PrivacyPolicy'
import Admin from './components/Admin'
import AdminMainPage from './components/AdminMainPage'
import Messages from './components/Messages';
import BlogAdmin from './components/BlogAdmin';
import SingleArticle from './components/SingleArticle';
import NewUser from './components/NewUser';
import ClientsAdmin from './components/ClientsAdmin';
import SalesSitesAdmin from './components/SalesSitesAdmin';
import SingleCourse from './components/SingleCourse';
import NewPassword from './components/NewPassword';
import MyCourses from './components/MyCourses';
import MyOrders from './components/MyOrders';
import MyProfile from './components/MyProfile';
import Basket from './components/Basket';
import SignUpOrSignIn from './components/SignUpOrSignIn';
import RegisterToMakePayment from './components/RegisterToMakePayment';
import LogInToMakePayment from './components/LogInToMakePayment';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import OrdersAdmin from './components/OrdersAdmin';
import MyInvoices from './components/MyInvoices'
import CourseView from './components/CourseView';
import InvoicesAdmin from './components/InvoicesAdmin';
import MyInvoiceView from './components/MyInvoiceView';
import ShowSingleInvoiceAdmin from './components/ShowSingleInvoiceAdmin';
import CorrectiveViewAdmin from './components/CorrectiveViewAdmin';
import CorrectiveUserInvoiceView from './components/CorrectiveUserInvoiceView';
import InvoicesReport from './components/InvoicesReport';
import TermsAndConditions from './components/TermsAndConditions'
import AboutP24 from './components/AboutP24'
import ProductsAndPricing from './components/ProductsAndPricing'
import MarketingTracker from './components/MarketingTracker'
import PaymentWaiting from './components/PaymentWaiting'
import SuccessStripe from './components/SuccessStripe'
import CancelStripe from './components/CancelStripe'
import NotFound from './components/NotFound';
import {initAuth} from "./api/auth";
import {getCookie} from "./utils/cookies";

function App() {

    useEffect(() => {
        const user = getCookie('user');
        if (user) {
            initAuth();
        }
    }, []);

    return (
    <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/o-nas" element={<AboutUs/>} />
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/kursy" element={<Courses/>} />
        <Route path="/kontakt" element={<Contact/>} />
        <Route path="/regulamin" element={<Regulations/>} />
        <Route path="/polityka-prywatnosci" element={<PrivacyPolicy/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin-main-page" element={<AdminMainPage/>} />
        <Route path="/messages" element={<Messages/>} />
        <Route path="/blogadmin" element={<BlogAdmin/>} />
        <Route path="/single-article" element={<SingleArticle/>} />
        <Route path="/new-user" element={<NewUser/>} />
        <Route path="/klienciadmin" element={<ClientsAdmin/>} />
        <Route path="/stronysprzedazowekursowadmin" element={<SalesSitesAdmin/>} />
        <Route path="/kurs" element={<SingleCourse/>} />
        <Route path="/change-password" element={<NewPassword/>} />
        <Route path="/moje-kursy" element={<MyCourses/>} />
        <Route path="/moje-zamowienia" element={<MyOrders/>} />
        <Route path="/moj-profil" element={<MyProfile/>} />
        <Route path="/basket" element={<Basket/>} />
        <Route path="/sign-up-or-sign-in" element={<SignUpOrSignIn/>} />
        <Route path="/register-to-make-payment" element={<RegisterToMakePayment/>} />
        <Route path="/log-in-to-make-payment" element={<LogInToMakePayment/>} />
        <Route path="/success" element={<SuccessPage/>} />
        <Route path="/cancel" element={<CancelPage/>} />
        <Route path="/zamowieniaadmin" element={<OrdersAdmin/>} />
        <Route path="/moje-faktury" element={<MyInvoices/>} />
        <Route path="/widok-kursu" element={<CourseView/>} />
        <Route path="/fakturyadmin" element={<InvoicesAdmin/>} />
        <Route path="/faktura" element={<MyInvoiceView/>} />
        <Route path="/widokfaktury" element={<ShowSingleInvoiceAdmin/>} />
        <Route path="/widokfakturykorygujacejadmin" element={<CorrectiveViewAdmin/>} />
        <Route path="/fakturakorygujaca" element={<CorrectiveUserInvoiceView/>} />
        <Route path="/raport-fakturowy" element={<InvoicesReport/>} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
        <Route path="/about-us" element={<AboutP24/>} />
        <Route path="/products-and-pricing" element={<ProductsAndPricing/>} />
        <Route path="/marketing-tracker" element={<MarketingTracker/>} />
        <Route path="/success-stripe" element={<SuccessStripe />} />
         <Route path="/cancel-stripe" element={<CancelStripe />} />
        <Route path="/payment-waiting" element={<PaymentWaiting />} />
        <Route path="*" element={<NotFound />} />
       </Routes>
    </Router>
    </Provider>
  );
}

export default App;
