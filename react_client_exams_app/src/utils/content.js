import { Reports }       from "../components/pages/Admin/Reports/Reports";
import { ManageTests }      from "../components/pages/Admin/ManageTests/ManageTests";
import { ManageQuestions }  from "../components/pages/Admin/ManageQuestions/ManageQuestions";
import { ReportByRespondentName } from "../components/pages/Admin/ReportByRespondentName/ReportByRespondentName";

export const AdminMenu = [
    {
        title: 'Manage Questions',
        content: <ManageQuestions></ManageQuestions>
    },
    {
        title: 'Manage Tests',
        content: <ManageTests></ManageTests>
    },
    {
        title: 'Manage Reports',
        content: <Reports></Reports>
    },
    {
        title: 'Report by Respondent Name',
        content: <ReportByRespondentName></ReportByRespondentName>
    }
];