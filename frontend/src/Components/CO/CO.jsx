import React, { useEffect, useRef, useState } from 'react'
import classes from './CO.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {FormActions} from '../../store/store';
import COColumn from '../COColumn/COColumn';

const CO = () => {
    const containerRef=useRef();
    // redux
    const state=useSelector(state=>state)
    const dispatch=useDispatch();

    // current state
    const [columns,setColumns]=useState([{
        id:1,
        score:0
    }]);

    useEffect(()=>{
        dispatch(FormActions.changeCOInfo(columns));
        // containerRef.current.scrollLeft=containerRef.current.scrollWidth;
    },[columns])

    const AddColumn = () => {
        setColumns(prevColumns => {
            const newColumn = {
                id:prevColumns[prevColumns.length-1].id+1,
                score:0
            };
            return [...prevColumns, newColumn];
        });
    }

    const RemoveColumn = () => {
        setColumns(prevColumns => {
            const newColumns = [...prevColumns];
            newColumns.pop(); 
            return newColumns;
        });
    };

    const updateColumn=(id,fieldName,newVal)=>{
        setColumns(prevColumns=>{
            // Create a new copy of the columns array
            const newColumns = [...prevColumns];
            // Find the index of the column to update
            const columnIndex = id - 1;
            // Create a new copy of the column object with the updated value
            const updatedColumn = {
            ...newColumns[columnIndex],
            [fieldName]: newVal,
            };
            // Update the newColumns array with the updated column object
            newColumns[columnIndex] = updatedColumn;
            return newColumns;
        });
    }
    
    
  return (
    <>
    <h2>CO Info</h2>
    <div className={classes.CO} ref={containerRef}>
        <div className={classes.Sequence_InnerContainer}>
            {columns[0]!=null ? 
            columns.map(item=><COColumn key={item.id} Update={updateColumn} Remove={RemoveColumn} Add={AddColumn} last={item.id==columns.length} id={item.id} w8={0}/>):null}
        </div>
    </div>
    </>
  )
}

export default CO