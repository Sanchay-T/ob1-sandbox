 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import LoginPage from './LoginPage';
 
 const App = () => {
   return (
     <Router>
       <Routes>
         <Route path="/login" element={<LoginPage />} />
         {/* Other routes can be added here */}
       </Routes>
     </Router>
   );
 };
 
 export default App;
