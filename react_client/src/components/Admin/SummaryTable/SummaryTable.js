import styles                   from './SummaryTable.css';

export const SummaryTable = ({ test, dateRange, submissions, numPassed, passingPercentage, average, median, countNumberOfQuestions }) => {

    return (
        <>
            <table id="test__table">
                <tbody>
                    <tr>
                        <td>
                            <label>                                     Test name:                            </label> 
                            <label key={test && test.testName} className="summary_label__bold">        {test && test.testName}                </label> 
                        </td>
                    </tr>

                    <tr> 
                        <td> 
                            <label>                                     Test ID:                                </label> 
                            <label key={test && test.testID} className="summary_label__bold">          {test && test.id}                    </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Test code:                              </label> 
                            <label key={test && test.testCode} className="summary_label__bold">        {test && test.testCode}                  </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Test type:                              </label> 
                            <label key={test && test.testType} className="summary_label__bold">        {test && test.testType}                  </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Number of questions:                    </label> 
                            <label key={test && test.questions} className="summary_label__bold">       {countNumberOfQuestions()}               </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Passing grade:                          </label>
                            <label key={test && test.passingGrade} className="summary_label__bold">    {test && test.passingGrade}              </label> 
                        </td> 
                    </tr>
                </tbody>
            </table>
            <table id="additional_info__table">
                <tbody>
                    <tr> 
                        <td> 
                            <label>                                     Date range:                             </label>
                            <label key={dateRange} className="summary_label__bold">                    {dateRange}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Number of submissions:                  </label>
                            <label key={dateRange} className="summary_label__bold">                    {submissions}                              </label> 
                        </td> 
                    </tr>
                    <tr > 
                        <td> 
                            <label>                                     Number of respondents passed:           </label>
                            <label key={dateRange} className="summary_label__bold">                    {numPassed}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Passing percentage:                     </label>
                            <label key={dateRange} className="summary_label__bold">                    {passingPercentage}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Average grade:                          </label>
                            <label key={dateRange} className="summary_label__bold">                    {average}                              </label> 
                        </td> 
                    </tr>
                    <tr> 
                        <td> 
                            <label>                                     Median grade:                           </label>
                            <label key={dateRange} className="summary_label__bold">                    {median}                              </label> 
                        </td> 
                    </tr>
                </tbody>
            </table>
        </>
    )
};
