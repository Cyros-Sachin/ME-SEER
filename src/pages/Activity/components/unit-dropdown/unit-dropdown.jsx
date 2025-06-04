import React, { useEffect, useState } from "react";

const UnitDropdown = ({unit , isDropdownOpen,setIsDropdownOpen, dropdownvalues}) =>{
    
    const [dropdownValue,setDropDownValue] = useState('');

    useEffect(()=>{
        setDropDownValue(unit);
    },[unit]);

    return(
        <div onClick={()=>setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer border border-sky-900 w-full flex justify-center items-center relative">
            {dropdownValue}
            {
                isDropdownOpen && <div className="flex flex-col z-10 border border-black absolute min-h-[80px] bg-white top-[100%] w-full justify-center items-center">
                    {
                        dropdownvalues.map((dropValue) =>{
                            return <div className="cursor-pointer w-full m-1 h-full flex  justify-center items-center" onClick={()=>setDropDownValue(dropValue)}>{dropValue}</div>
                        })
                    }
                </div>
            }
        </div>
    )

}


export default UnitDropdown;