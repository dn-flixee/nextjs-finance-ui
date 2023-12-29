'use client';

import React, { useState ,useEffect} from 'react'
import IncomeCard from './IncomeCard';
import IncomeService from '@/components/IncomeService'
import IncomeSourceService from '@/components/IncomeSourceService'
import AccountService from '@/components/AccountService'
import Image from 'next/image';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    Sheet,
    SheetClose,
    SheetFooter,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function Income() {
  const [incomeCard,setIncomeCard] = useState([])
  const [account,setAccount] = useState([])
  const [incomeSource,setIncomeSource] = useState([])
  const [income, setIncome] = useState({
    name:"",
    amount:"",
    date:"",
    accountName:"",
    incomeSourceName:"",
  })
  const [date, setDate] = useState()
  useEffect(() => {
    IncomeService.getIncome()
    .then((Response) => {
      console.log(Response.data)
      setIncomeCard(Response.data)
    }).catch(error => {
      console.log(error)
    })

    IncomeSourceService.getIncomeSource()
    .then((Response)=>{
      console.log("source name")
      console.log(Response.data)
      setIncomeSource(Response.data)
    }).catch( error =>{
      console.log(error);
    })

    AccountService.getAccount()
    .then((Response)=>{
      console.log("account name")
      console.log(Response.data)
      setAccount(Response.data)
    }).catch( error =>{
      console.log(error);
    })
  }, [])
  

  const handleChange = (e) => {
    const value = e.target.value;
    setIncome({...income,[e.target.name]: value})
  }

  const saveIncome = (e) => {
    e.preventDefault();
    console.log("save button press")
    IncomeService.saveIncome(income).then(Response => {
      console.log(Response)
    }).catch(error => {
      console.log(error)
    })

  }
  return (
    <>
    
      <div className='flex-1 border rounded-2xl border-primary m-6'>

        <div className='flex m-4'>
          <Image className='m-2' src="/wallet_icon.png" width={25} height={25}/>
          <p className="text-bold m-2 text-2xl text-primary"> I N C O M E</p>
        </div>

      <div className="container p-4">
       <div className="flex flex-row">
        <div className="flex flex-grow ">
        <Select className=" bg-primary m-2">
            <SelectTrigger className="max-w-28">
                <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="est">Jan</SelectItem>
                <SelectItem value="cst">Feb</SelectItem>
                <SelectItem value="mst">Mar</SelectItem>
                <SelectItem value="pst">Apr</SelectItem>
                <SelectItem value="akst">May</SelectItem>
            </SelectContent>
        </Select>
        <Select>
            <SelectTrigger className="max-w-28">
                <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="est">2021</SelectItem>
                <SelectItem value="cst">2022</SelectItem>
                <SelectItem value="mst">2023</SelectItem>
                <SelectItem value="pst">2024</SelectItem>
                <SelectItem value="akst">2025</SelectItem>
            </SelectContent>
        </Select>
          </div>


          <div className='flex '>
            <Sheet>
                <SheetTrigger asChild><Button className="bg-blue-600">New</Button></SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Add Income</SheetTitle>
                    <SheetDescription>
                    </SheetDescription>
                  </SheetHeader>
                  <form onSubmit={saveIncome}> 
              <input type="text" 
                name="name"
                value={income.name}
                onChange={(e) => handleChange(e)}
                placeholder="Name" 
                className="input input-ghost w-full max-w-xs" required />

              <input type="number" 
                name="amount"
                placeholder="Amount"
                value={income.amount} 
                onChange={(e) => handleChange(e)}
                className="input input-ghost w-full max-w-xs" required/>

              <select 
                name='accountName'
                value={income.accountName}
                onChange={(e) => handleChange(e)}
                className="select select-ghost w-full max-w-xs" required>
                  <option value="" disabled selected hidden> -- Select an Account -- </option>
                  {account.map((option,index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
              </select>

              <select 
                name='incomeSourceName'
                value={income.incomeSourceName}
                onChange={(e) => handleChange(e)}
                className="select select-ghost w-full max-w-xs" required>
                  <option value="" disabled selected hidden > -- Select an Income Source -- </option>
                  {incomeSource.map((option,index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
              </select>


              <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <SheetFooter>
                 <SheetClose asChild>
                  <Button type="submit" className="">Save</Button>
                  </SheetClose>
                </SheetFooter>
                </form >
              </SheetContent>
            </Sheet>

          </div>
        </div>
        <hr className='mt-2 mb-8'/>
        {incomeCard.map( income =>(
          <label htmlFor="my-drawer-4" className="drawer-button ">
            <IncomeCard incomeId = {income.incomeId} name={income.name} incomeAmount={income.amount} accountName={income.accountName}/>
          </label>
          
        ))}
 
      </div>
      </div>
      </>
  )
}

export default Income