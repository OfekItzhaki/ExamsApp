import styles                   from './SummaryTable.css';
import { useState }             from 'react';

export const SummaryTable = ({ test, dateRange, countNumberOfQuestions }) => {

    return (
        <>
            <table id="test__table">
                <tbody>
                    <tr>
                        <th> Summary </th>
                    </tr>

                    <tr>
                        <td>
                            <label>                                     Test name:                            </label> 
                            <label key={test && test.testName}>        {test && test.testName}                </label> 
                        </td>
                    </tr>

                    <tr> 
                        <td> 
                            <label>                                     Test ID:                                </label> 
                            <label key={test && test.testID}>          {test && test.testID}                    </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Test code:                              </label> 
                            <label key={test && test.testCode}>        {test && test.testCode}                  </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Test type:                              </label> 
                            <label key={test && test.testType}>        {test && test.testType}                  </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Number of questions:                    </label> 
                            <label key={test && test.questions}>       {countNumberOfQuestions()}               </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Passing grade:                          </label>
                            <label key={test && test.passingGrade}>    {test && test.passingGrade}              </label> 
                        </td> 
                    </tr>
                </tbody>
            </table>
            <table id="additional_info__table">
                <tbody>
                    <tr> 
                        <td> 
                            <label>                                     Date range:                             </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Number of submissions:                  </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr > 
                        <td> 
                            <label>                                     Number of respondents passed:           </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Passing percentage:                     </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Average grade:                          </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Median grade:                           </label>
                            <label key={dateRange}>                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                </tbody>
            </table>
        </>
    )
};
