import { TestReport }       from "../components/pages/Admin/TestReport/TestReport";
import { ManageTests }      from "../components/pages/Admin/ManageTests/ManageTests";
import { ManageQuestions }  from "../components/pages/Admin/ManageQuestions/ManageQuestions";

export const AdminMenu = [
    {
        title: 'Manage Questions',
        content: <ManageQuestions></ManageQuestions>
    },
    {
        title: 'Manage Test',
        content: <ManageTests></ManageTests>
    },
    {
        title: 'Manage Reports',
        content: <TestReport></TestReport>
    }
];