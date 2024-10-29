"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview(params) {
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
        setInterviewData(result);
        } catch(err){
            console.log(err)
        }
        
    }
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
        <h2 className=' font-bold text-2xl'>Lets start </h2>
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
            <Button onClick={()=>setWebCamEnable(true)}>Start Camera</Button>
            </>
        }
        </div>
        <div>
            <h2><strong>JOB ROLE/DESCRIPTION</strong>{/*interviewData.jobPosition*/} </h2>
        </div>

    </div>
  )
}

export default Interview