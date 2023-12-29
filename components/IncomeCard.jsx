import React, { useState } from 'react'
import IncomeService from './IncomeService'
import Image from 'next/image'


function IncomeCard({incomeId,name,incomeAmount,accountName}) {

  const deleteIncome = () =>{
      IncomeService.deleteIncome(incomeId)
      .then(Response => {
        console.log(Response)
      })
      .catch(error =>{
        console.log(error);
      })
  }
  
  return (
    <div className='flex flex-row justify-between rounded-md h-10 p-2 mb-2'>
        <div className='flex justify-items-start '>
            <Image src="/income_icon.png" width={25} height={25}/>
            <p className='font-semibold p-1'>{name}</p>
        </div>
        <div className='flex justify-around justify-items-end '>
            <div className='p-1'><p className='font-semibold'>₹{incomeAmount}</p></div>
            <div className='pr-1'><img src="/bank_icon.png" width={25} height={25}></img></div>
            <div className='p-1'><p className='font-semibold'>{accountName}</p></div>
        </div>
    </div>
  )
}

export default IncomeCard