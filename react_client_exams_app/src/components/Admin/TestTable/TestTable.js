import styles                   from './TestTable.css';

export const TestTable = ({ tests, handleDelete }) => {
    return (
        <table id="tests__table">
            <tbody>
                <tr className="space_under header_row border_bottom">
                    <th> ID                 </th>
                    <th> Link               </th>
                    <th> Test Name          </th>
                    <th> Num of Questions   </th>
                    <th> Last Update        </th>
                    <th> Type               </th>
                    <th> Version            </th>
                    <th>                    </th>
                </tr>
                

                {tests.map((test) => (
                <tr className="space_under border_bottom" key={test.id}>
                    <td className="test_id">            {test.id}                                           </td>
                    <td className="test_link">          <button className="regular__button"> Copy </button> </td>
                    <td className="test_name">          {test.testName}                                     </td>
                    <td className="test_amount">        {test.testType}                                     </td>
                    <td className="test_update">        {test.lastUpdate}                                   </td>
                    <td className="test_type">          {test.testType}                                     </td>
                    <td className="test_version">       {test.version}                                      </td>
                    <td className="buttons">
                        <button className="regular__button"> Edit       </button>
                        <button className="regular__button"> Duplicate  </button>
                        <label>             </label>
                    </td>
                </tr> ))}
            
            </tbody>
        </table>
    )
};
