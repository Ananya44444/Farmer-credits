// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Header from './components/Common/Header';
// import Footer from './components/Common/Footer';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import OTPVerification from './components/Auth/OTPVerification';
// import Dashboard from './components/Dashboard/Dashboard';
// import FarmForm from './components/Farm/FarmForm';
// import FarmList from './components/Farm/FarmList';
// import Wallet from './components/Wallet/Wallet';
// import './App.css';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Header />
//         <main>
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/verify-otp" element={<OTPVerification />} />
//             <Route path="/farms" element={<FarmList />} />
//             <Route path="/farms/new" element={<FarmForm />} />
//             <Route path="/farms/edit/:id" element={<FarmForm />} />
//             <Route path="/wallet" element={<Wallet />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import FarmForm from './components/Farm/FarmForm';
import FarmList from './components/Farm/FarmList';
import Wallet from './components/Wallet/Wallet';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/farms" element={<FarmList />} />
          <Route path="/farms/new" element={<FarmForm />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;