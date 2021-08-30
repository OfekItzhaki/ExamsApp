import { Reports }       from "../components/pages/Admin/MainPage/Reports/Reports";
import { ManageTests }      from "../components/pages/Admin/MainPage/ManageTests/ManageTests";
import { ManageQuestions }  from "../components/pages/Admin/MainPage/ManageQuestions/ManageQuestions";
import { ReportByRespondentName } from "../components/pages/Admin/MainPage/ReportByRespondentName/ReportByRespondentName";

export const AdminMainPageMenu = [
    {
        title: 'Manage Questions',
        content: <ManageQuestions></ManageQuestions>,
        link: "/admin/manage-questions"
    },
    {
        title: 'Manage Tests',
        content: <ManageTests></ManageTests>,
        link: "/admin/manage-tests"
    },
    {
        title: 'Reports',
        content: <Reports></Reports>,
        link: "/admin/reports"
    },
    {
        title: 'Report by Respondent Name',
        content: <ReportByRespondentName></ReportByRespondentName>,
        link: "/admin/report-by-name"
    }
];