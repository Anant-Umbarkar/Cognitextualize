import React, { useEffect, useRef, useState } from 'react'
import classes from './Module.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {FormActions} from '../../store/store';
import ModuleColumn from '../ModuleColumn/ModuleColumn';
import { FaCircleInfo } from "react-icons/fa6";

const Module = () => {
    const containerRef=useRef();
    // redux
    const state=useSelector(state=>state)
    const dispatch=useDispatch();

    // current state
    const [columns,setColumns]=useState([{
        id:1,
        hours:0,
    }]);

    useEffect(()=>{
        dispatch(FormActions.changeModuleInfo(columns));
        // containerRef.current.scrollLeft=containerRef.current.scrollWidth;
    },[columns])

    const AddColumn = () => {
        setColumns(prevColumns => {
            const newColumn = {
                id:prevColumns[prevColumns.length-1].id+1,
                hours:0,
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

    const updateColumn=(id,newVal)=>{
        setColumns(prevColumns=>{
            // Create a new copy of the columns array
            const newColumns = [...prevColumns];
            // Find the index of the column to update
            const columnIndex = id - 1;
            // Create a new copy of the column object with the updated value
            const updatedColumn = {
            ...newColumns[columnIndex],
            ["hours"]: newVal,
            };
            // Update the newColumns array with the updated column object
            newColumns[columnIndex] = updatedColumn;
            return newColumns;
        });
    }
    const bgImageStyle = {
        backgroundImage: 'url(https://img.freepik.com/free-vector/white-abstract-background_23-2148844576.jpg?w=996&t=st=1713423045~exp=1713423645~hmac=3aec548de81f70ec1c2c12fbfc2c7213fbbe446e37be00856a169df54ee83c8e)',
        backgroundSize: 'cover', 
      };
    
  return (<div className='mt-4  p-3'>
    <div className="heading container-fluid  d-flex align-items-center justify-content-start">
        <h1 >Module Info</h1>
        <FaCircleInfo />
        <span className="tooltiptext">The number of hours spent on each module, in-order to find the weightage of each one</span>
    </div>
    <div className={classes.Module} ref={containerRef} >
        <div className='${classes.Sequence_InnerContainer} d-flex align-items-center justify-content-start flex-wrap'>
            {columns[0]!=null ? 
            columns.map(item=><ModuleColumn key={item.id} Update={updateColumn} Remove={RemoveColumn} Add={AddColumn} last={item.id==columns.length} id={item.id}/>):null}
        </div>
    </div>
    </div>
  )
}

export default Module