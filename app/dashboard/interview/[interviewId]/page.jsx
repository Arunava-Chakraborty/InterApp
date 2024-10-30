"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Link from 'next/link'

function Interview({params}) {
    const [interviewData , setInterviewData] = useState();
    const [webCamEnable , setWebCamEnable] = useState(false);

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async() =>{
        try{
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockID, params.interviewId))
        console.log(result);
        setInterviewData(result[0]);
        } catch(err){
            console.log(err)
        }
        
    }
  return (
    <div className='my-10 '>
        <h2 className=' font-bold text-2xl'>Lets start </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12' >
                <div className='flex flex-col my-5 gap-5'>
                    <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
                        <h2><strong>JOB ROLE/DESCRIPTION : </strong>{interviewData?.jobPosition || "N/A"}</h2>
                        <h2><strong>JOB TechStack : </strong>{interviewData?.jobDesc || "N/A"}</h2>
                        <h2><strong>Years Of Experience : </strong>{interviewData?.jobExperience || "N/A"}</h2>
                    </div>

                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-50'>
                        <h2 className='flex gap-2 items-center text-yellow-500'> <Lightbulb/> <strong>Information</strong> </h2>
                        <h2 className='mt-3 text-yellow-500'> {process.env.NEXT_PUBLIC_INFORMATION}</h2> 
                    </div>
                </div>


                <div>
                    {webCamEnable?<Webcam
                    onUserMedia={()=>setWebCamEnable(true)}
                    onUserMediaError={()=>setWebCamEnable(false)}
                    mirrored = {true}
                    style={{
                        height:300,
                        width:300
                    }}
                    />
                    :<>
                    <WebcamIcon className='h-72 w-full p-10 bg-secondary rounded-lg border my-4' 
                    />
                    <Button onClick={()=>setWebCamEnable(true)}>Enable Camera</Button>
                    </>
                }
            
                </div>

        </div>
        
        <div className='flex justify-end items-end'>
            <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button>
                    Start Interview
                </Button>
            </Link>
        </div>
       
        

    </div>
  )
}

export default Interview