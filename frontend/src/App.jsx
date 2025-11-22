 import React from 'react';
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
 import Login from './Login';
 
 const App = () => {
   return (
     <Router>
       <Routes>
         <Route path="/login" element={<Login />} />
         {/* Other routes can be added here */}
       </Routes>
     </Router>
   );
 };
 
 export default App;
