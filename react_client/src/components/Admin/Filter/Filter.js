import styles                   from './Filter.css';

export const Filter = ({ filterStatus, totalAmount, filteredAmount, filterBy, handleFilterByChange, handleFilterContentChange }) => {

    return (
        <div id="filter__container">
            <div id="filter_by__container">
                <label> Filter by: </label>
                <select onChange={ (e) => handleFilterByChange(e.target.value) }>
                    { filterBy && filterBy.map((by) => {
                        return (
                            <option value={by.name}> {by.name} </option>
                        )
                    })}
                </select>
            </div>

            <div id="filter_input__container">
                <input id="filter__input" type="text" onChange={ (e) => handleFilterContentChange(e.target.value) } placeholder="Enter a list of keywords separated by commas"/>
            </div>

            <div id="filter_status__container">
                <label id="filter__status">         Filter is   {filterStatus === false ? "OFF" : "ON"}                                             </label>
            </div>

            <div id="amount_filtered__container">
                <label id="amount__filtered">       Filtered    {filteredAmount ? filteredAmount : "0"} of total {totalAmount ? totalAmount : ""}    </label>
            </div>
        </div>
    )
};
