'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAi'
import { json } from 'drizzle-orm/mysql-core'
import { LoaderCircle } from 'lucide-react'

function AddNewInterview() {
  const [openDialog , setOpenDialog]= useState(false);
  const [jobPosition , setJobPosition] = useState() ; 
  const [jobDesc , setJobDesc] = useState();  
  const [jobExperience , setJobExperience] = useState() ; 
  const [loading , setLoading] = useState(false);
  const [jsonResponse , setJsonResponse]= useState([]);

  const onSubmit =async(e)=>{
      setLoading(true);
      e.preventDefault()
      console.log(jobPosition, jobDesc ,jobExperience)
      const InputPrompt = "Job Position:" + jobPosition + "Job Description:" + jobDesc +"Years of Experience :" + jobExperience + ". Depends on this information please give me" + process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT +" interview questions with answered in JSON Format. Give Questions and Answered as a field of JSON"

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = (result.response.text()).replace('```json','').replace('```','')

      console.log(JSON.parse(MockJsonResp));
      setLoading(false);
    }

  return (
    <div>
      <div className='p-10 border rounded-lg bg-secondary
      hover:scale-105 hover:shadow-md cursor-pointer
      transition-all '
        onClick={()=>setOpenDialog(true)}
      >
        <h2 className='font-bold text-lg text-center'>+ADD NEW</h2>
      </div>
      <Dialog open= {openDialog}> 
        <DialogContent className ='max-w-2xl bg-slate-50'>
          <DialogHeader>
            <DialogTitle className = 'text-2xl'>Tell Us More About job Interview </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit} >
              <div>
                <h2>Add Details About Your Job Position,Job Description,Year Of Experience.  </h2>

                <div className='mt-7 my-3'>
                  <label> Job Role/Job Position</label>
                  <Input placeholder = "Ex. Full-Stack developer" required
                  onChange = {(event)=>setJobPosition(event.target.value)}
                  />
                </div>
                <div className=' my-3'>
                  <label> Job Description(in-short) OR Tech Stack</label>
                  <Textarea placeholder = "Ex. javascript , Nodejs , Python , MySql" required
                  onChange = {(event)=>setJobDesc(event.target.value)}
                  />
                </div>
                <div className=' my-3'>
                  <label> Years of Experience</label>
                  <Input placeholder = "Ex. 6" type = 'number' max = {80} required
                  onChange = {(event)=>setJobExperience(event.target.value)}
                  />
                </div>
              </div>   
               
              <div className='flex gap-6 justify-end'>
                <Button type = 'button' variant = "ghost"
                  onClick={()=>setOpenDialog(false)}
                >Cancel</Button>
                <Button type = 'submit' disabled = {loading}>
                  {loading?
                  <>
                    <LoaderCircle className='animate-spin'/> Generating the Questions
                  </> : "Start Interview"
                  }
                </Button>
              </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview