import React, { useEffect, useState } from 'react'
import "./todo.css"
import todo from "../images/todo.png";

// Get data from LS
const getLocalItem = () =>{
    let List = localStorage.getItem('Lists');
    console.log(List);
    if(List){
        return JSON.parse(localStorage.getItem('Lists'));
    }
    else{
        return [];
    }
}

const Todoapp = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItem());
    const [toggleBtn, setToggleBtn] = useState(true);
    const [isEditItem, setIsEdit] = useState(null)


    const addItem = () =>{
        if(!inputData){
            alert("Please Fill The Data")
        }
        else if(inputData && !toggleBtn){
            setItems(
                items.map((ele)=>{
                    if(ele.id === isEditItem){
                        return {...ele, name:inputData}
                    }
                    return ele;
                })
            )
            setToggleBtn(true);
            setInputData("");
            setIsEdit(null)
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name: inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
        
    }

    const handleKeyPress = (e) =>{
        if(e.key === "Enter"){
            addItem();
          }
    }

    const editItem  = (id) =>{
        let newEditItem = items.find((ele)=>{
            return ele.id === id ;
        });
        console.log(newEditItem)
        setToggleBtn(false);
        setInputData(newEditItem.name);
        setIsEdit(id)
    }

    const deleteItem = (index) =>{
        // console.log(id);
        const updatedItems = items.filter((ele)=>{
            return index !== ele.id
        });
        setItems(updatedItems)
    }

    const removeAll = () =>{
        setItems([])
    }

    useEffect(()=>{
        localStorage.setItem("Lists", JSON.stringify(items))
    },[items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={ todo } alt="" />
                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    <div className="addItems">

                        <input type="text" placeholder="Add items..." id="" 
                            value = {inputData}
                            onChange = {(event)=>setInputData(event.target.value)}
                            onKeyPress = { (event)=> handleKeyPress(event) }
                        />
                        {
                           toggleBtn ?   <i className="fa fa-plus add-btn" title="Add Item" onClick={ addItem }></i>:
                                        <i className="far fa-edit add-btn" title="Update Item" onClick={ addItem }></i>
                        }
                       

                    </div>



                    <div className="showItems">
                        {
                            items.map((ele)=>{
                                return(
                                    <div className="eachItem" key={ele.id}>
                                        <h3>{ele.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn"  title="Edit Item"
                                                onClick={()=> editItem(ele.id) }
                                            ></i>
                                            <i className="fa fa-trash add-btn"  title="Add Item"
                                                onClick={()=> deleteItem(ele.id) }
                                            ></i>

                                        </div>
                                        
                                    </div>
                                )
                            })
                        }
                        
                    </div>



                    <div className="showItems">
                        <button className="btn effect04" onClick={ removeAll }><span>Remove All</span></button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todoapp
