import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { DashboardPages } from './interfaces';
import QuizCreation from './pages/Quiz';
import QuizResults from './pages/QuizResult';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={DashboardPages.Home} element={<Home />} />
      <Route path={DashboardPages.SignUp} element={<SignUp />} />
      <Route path={DashboardPages.SignIn} element={<SignIn />} />
      <Route path={DashboardPages.VerifyEmail} element={<VerifyEmail />} />
      <Route element={<ProtectedRoute />}>
        <Route path={DashboardPages.Dashboard} element={<Dashboard />} />
        <Route path={DashboardPages.Quiz} element={<QuizCreation />} />
        <Route path="/quiz-result/:quizId" element={<QuizResults />} />
      </Route>
      {/* <Route element={<ProtectedRoute path={'/dashboard'} element={<Dashboard />}  />} /> */}
      <Route path='*' element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default App;
