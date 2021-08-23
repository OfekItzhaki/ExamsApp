import React from 'react';
import styles from './ManageTests.module.css';


export const ManageTests = ({
    children, 
    type, 
}) => {

    return (
        <div id={styles.main__container}>
            <div id={styles.headers__container}>
                <h1> Available questions for </h1>
                <h1 id={type}> {type} </h1>
            </div>
            <div id={styles.filter__container}>
                <label> Filter by tags or content: </label>
                <input id={styles.filter__content} type='text' placeholder='parameter'/>
                <label id={styles.filter__state}></label>
                <label id={styles.amount__filtered}></label>
            </div>
            <div id={styles.table__container}>
                <table id={styles.questions__table}>
                    <tr>
                        <th> ID </th>
                        <th> Question Text and Tags </th>
                        <th> Last Update </th>
                        <th> Question Type </th>
                        <th> # of Tests </th>
                    </tr>
                    <tr >
                        {/* {children.map(({ ID, Tnt, update, type, amount }) => (
                            
                        <td> {ID} </td>
                        <td> {TnT} </td>
                        <td> {update} </td>
                        <td> {type} </td>
                        <td> {amount} </td>
                        <td> </td>
                        ))} */}
                    </tr>
                </table>
            </div>

        </div>
    )
};
