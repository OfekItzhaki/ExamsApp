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
import { CreateEditQuestion     } from "./components/pages/Admin/CreateEditQuestion/CreateEditQuestion";
import { CreateEditTest         } from "./components/pages/Admin/CreateEditTest/CreateEditTest";
import { ManageQuestions        } from "./components/pages/Admin/ManageQuestions/ManageQuestions";
import { ManageTests            } from "./components/pages/Admin/ManageTests/ManageTests";
import { Reports                } from "./components/pages/Admin/Reports/Reports";
import { ReportByRespondentName } from "./components/pages/Admin/ReportByRespondentName/ReportByRespondentName";

// --------------------------------------------- Student pages ---------------------------------------------
import SignUp                     from "./components/pages/Student/SignUp/SignUp";


export default function App() {

  return (
      <>
        <Router>
          <Navbar/>
          <Switch>

            {/* Shared */}
            <Route path='/' exact                     component={ Home            }   />
            <Route path='/home'                       component={ Home            }   />
            <Route path='/login'                      component={ Login           }   />
            <Route path='/sign-up'                    component={ SignUp          }   />
            <Route path='/forgot-password'            component={ ForgotPassword  }   />
            <Route path='/about'                      component={ About           }   />
            <Route path='/error404'                   component={ Error404        }   />

            {/* Admin */}
            <Route path='/admin/main-page'            component={MainPage}            />
            <Route path='/admin/create-question'      render={ (props) => (<CreateEditQuestion      {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/edit-question'        render={ (props) => (<CreateEditQuestion      {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/create-test'          render={ (props) => (<CreateEditTest          {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/edit-test'            render={ (props) => (<CreateEditTest          {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/manage-questions'     render={ (props) => (<ManageQuestions         {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/manage-tests'         render={ (props) => (<ManageTests             {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/reports'              render={ (props) => (<Reports                 {...props} isAuthed={true} isAdmin={true} />) }   />
            <Route path='/admin/report-by-name'       render={ (props) => (<ReportByRespondentName  {...props} isAuthed={true} isAdmin={true} />) }   />
            {/* <Route path='/admin/create-question'  component={CreateEditQuestion}      />
            <Route path='/admin/edit-question'        component={CreateEditQuestion}      />
            <Route path='/admin/create-test'          component={CreateEditTest}          />
            <Route path='/admin/edit-test'            component={CreateEditTest}          />
            <Route path='/admin/manage-questions'     component={ManageQuestions}         />
            <Route path='/admin/manage-tests'         component={ManageTests}             />
            <Route path='/admin/reports'              component={Reports}                 />
            <Route path='/admin/report-by-name'       component={ReportByRespondentName}  /> */}
            {/* <Route path='/admin/test-report'      component={TestReport}              />       ROUTE FOR THE TEST REPORT ITSELF */}
            
            <Redirect to="/error404"/>

          </Switch>
        </Router>
        <Footer logo="OIES" rights="OI Exam System © 2021"/>
      </>
  )
};

export const Field = () => {

};