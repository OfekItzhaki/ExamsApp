import { Reports }       from "../components/pages/Admin/Reports/Reports";
import { ManageTests }      from "../components/pages/Admin/ManageTests/ManageTests";
import { ManageQuestions }  from "../components/pages/Admin/ManageQuestions/ManageQuestions";
import { ReportByRespondentName } from "../components/pages/Admin/ReportByRespondentName/ReportByRespondentName";

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
        title: 'Manage Reports',
        content: <Reports></Reports>,
        link: "/admin/reports"
    },
    {
        title: 'Report by Respondent Name',
        content: <ReportByRespondentName></ReportByRespondentName>,
        link: "/admin/report-by-name"
    }
];