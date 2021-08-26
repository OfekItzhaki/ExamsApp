import React, { useEffect, useState }  from 'react';
import styles from './Reports.css';

export const Reports = ({
    children, 
    type, 
}) => {

    const [dateTo,      setDateTo]      = useState("");
    const [dateFrom,    setDateFrom]    = useState("");
    const [past,        setPast]        = useState(true);

    useEffect(() => {
        document.title = "Reports";
    }, [])

    return (
        <div className='reports noselect'>
            <div id="headers__container">
                <h1> Test Report for </h1>
                <h1 id="type"> {type} </h1>
            </div>
            <div id="content__container">

                <table id="content__table">
                    <tbody>
                        <tr>
                            <td>
                                <label id="label__test_name">       Select Test:            </label>
                            </td>
                            <td>

                                {/* MAP FOR EACH TEST */}
                                <select id='tests_names'>
                                    <option value='5'> 5 - javascript basics - (Predefined) </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label id="label__date_range">      Date Range:             </label>
                            </td>
                            <td>
                                <label id="label__from">            From:                   </label>
                                <input type="date" value={dateFrom} onChange={(e) => dateFrom   === false ?   setDateFrom("")   : setDateFrom(dateFrom)}    />
                            </td>
                            <td>
                                <label id="label__to">              To:                     </label>
                                <input type="date" value={dateTo}   onChange={(e) => dateTo     === false ?   setDateTo(false)  : setDateTo(dateTo)}        />
                            </td>
                        </tr>
                        <tr>
                            <td>  </td>
                            <td>
                                <label id="label__OR">              OR                      </label>
                            </td>
                        </tr>

                        <tr>
                            <td>  </td>
                            <td>
                                <input type="checkbox" value={past} onChange={(e) => past       === false ?   setPast(false)    : setPast(true)}            />
                                <label id="label__past">            Any date in the past    </label>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div id="button__container">
                <button onClick={ Back() }>     {`<<` } Back                </button>
                <button type="submit">          Generate Report             </button>
                </div>
            </div>

        </div>
    )
};

// NEED TO CHECK WHY THESE GUYS AUTOMATICALLY START

function Back() {
    // window.location.href = history.back;
}