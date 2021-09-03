import React          from "react";
import Navbar         from "./components/shared/Navbar/Navbar";
import
{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect 
}                     from 'react-router-dom';
import styles         from './App.css';

// ---------------------------------------------- Shared pages ----------------------------------------------
import Home                       from './components/pages/shared/Home/Home';
import About                      from './components/pages/shared/About/About';
import Login                      from "./components/pages/shared/Login/Login";
import ForgotPassword             from "./components/pages/shared/ForgotPassword/ForgotPassword";
import Error404                   from "./components/pages/shared/Error404/Error404";
import Footer                     from "./components/shared/Footer/Footer";

// ---------------------------------------------- Admin pages ----------------------------------------------
import MainPage                   from "./components/pages/Admin/MainPage/MainPage";
import CreateEditQuestion         from "./components/pages/Admin/MainPage/ManageQuestions/CreateEditQuestion/CreateEditQuestion";
import CreateEditTest             from "./components/pages/Admin/MainPage/ManageTests/CreateEditTest/CreateEditTest";
import ManageQuestions            from "./components/pages/Admin/MainPage/ManageQuestions/ManageQuestions";
import ManageTests                from "./components/pages/Admin/MainPage/ManageTests/ManageTests";
import Reports                    from "./components/pages/Admin/MainPage/Reports/Reports";
import ReportByRespondentName     from "./components/pages/Admin/MainPage/ReportByRespondentName/ReportByRespondentName";
import TestReport                 from "./components/pages/Admin/MainPage/Reports/TestReport/TestReport";

// --------------------------------------------- Student pages ---------------------------------------------
import SignUp                     from "./components/pages/Student/SignUp/SignUp";
import { StartPage }                  from "./components/pages/Student/StartPage/StartPage";
import Test                       from "./components/pages/Student/Test/Test";
import AfterSubmit                from "./components/pages/Student/AfterSubmit/AfterSubmit";
import ReviewTest                 from "./components/pages/Student/ReviewTest/ReviewTest";


export default function App() {

  return (
      <>
        <Router>
          <Navbar/>
          <Switch>

            {/* Shared */}
            <Route path='/'                               exact component={ Home            }   />
            <Route path='/home'                           exact component={ Home            }   />
            <Route path='/about'                          exact component={ About           }   />
            <Route path='/error404'                       exact component={ Error404        }   />
            <Route path='/login'                          exact render={ (props) => (<Login                   {...props} isAuthed={false} />) }   />
            <Route path='/forgot-password'                exact render={ (props) => (<ForgotPassword          {...props} isAuthed={false} />) }   />
exact 
            {/* Admin */}   exact 
            <Route path='/admin/main-page'                exact component={MainPage}            />
            <Route path='/admin/create-question'          exact render={ (props) => (<CreateEditQuestion      {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/edit-question'            exact render={ (props) => (<CreateEditQuestion      {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/create-test'              exact render={ (props) => (<CreateEditTest          {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/edit-test'                exact render={ (props) => (<CreateEditTest          {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/manage-questions'         exact render={ (props) => (<ManageQuestions         {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/manage-tests'             exact render={ (props) => (<ManageTests             {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/reports'                  exact render={ (props) => (<Reports                 {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/report-by-name'           exact render={ (props) => (<ReportByRespondentName  {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/test-report'              exact render={ (props) => (<TestReport              {...props} isAuthed={true} isAdmin={true} />) }   />
            {/* <Route path='/admin/create-question'  component={CreateEditQuestion}      />
            <Route path='/admin/edit-question'        component={CreateEditQuestion}      />
            <Route path='/admin/create-test'          component={CreateEditTest}          />
            <Route path='/admin/edit-test'            component={CreateEditTest}          />
            <Route path='/admin/manage-questions'     component={ManageQuestions}         />
            <Route path='/admin/manage-tests'         component={ManageTests}             />
            <Route path='/admin/reports'              component={Reports}                 />
            <Route path='/admin/report-by-name'       component={ReportByRespondentName}  />
            <Route path='/admin/test-report'          component={TestReport}              /> */}

            {/* Student */}
            <Route path='/sign-up'                        exact render={ (props) => (<SignUp                  {...props} isAuthed={false} />) }   />
            <Route path='/student/:randomID'              exact render={ (props) => (<StartPage               {...props} isAdmin={false}  />) }   />
            <Route path='/student/test/:randomID'         exact render={ (props) => (<Test                    {...props} isAdmin={false}  />) }   />
            <Route path='/student/after-submit/:randomID' exact render={ (props) => (<AfterSubmit             {...props} isAdmin={false}  />) }   />
            <Route path='/student/review-test/:randomID'  exact render={ (props) => (<ReviewTest              {...props} isAdmin={false}  />) }   />


            {/* If we got here, redirects to the error404 page: page was not found */}
            <Redirect to="/error404"/>  

          </Switch>
        </Router>
        <Footer/>
      </>
  )
};