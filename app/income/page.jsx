import React from 'react'
import Navbar from '@/components/navbar'
import Income from '@/components/income'
import IncomeSource from '@/components/incomeSource'

function IncomeDashboard() {
  
  return (

        <div className='flex flex-wrap h-full bg-#232323'>
                <Income/>
                <IncomeSource/>
              </div>

  )
}

export default IncomeDashboard