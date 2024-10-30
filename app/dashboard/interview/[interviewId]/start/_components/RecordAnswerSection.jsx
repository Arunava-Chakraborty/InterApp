"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';

function RecordAnswerSection() {

    const [userAnswe , setUserAnswer] = useState('');
        const {
            error,
            interimResult,
            isRecording,
            results,
            startSpeechToText,
            stopSpeechToText,
        } = useSpeechToText({
            continuous: true,
            useLegacyResults: false
  });

        useEffect(()=>{
              results.map((result)=>(
                setUserAnswer(prevAns=>prevAns+result?.transcript)
              ))   
        },[results])


        const SaveUserAnswer =()=>{
            if(isRecording){
                stopSpeechToText()
            }
            else{
                startSpeechToText()
            }
        }

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className='flex flex-col mt-3 justify-center items-center bg-black rounded-lg p-5'>
            <Image src={'/webcam.png'} width={200} height={200}
            className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,
                width: '100%',
                zIndex:10,
            }}
            />
        </div>

        <Button variant = 'outline' className = "my-11"
        onClick = {SaveUserAnswer}

        >
            {isRecording?
            <h2 className='text-red-700 flex gap-2'>
                <Mic/> Stop Recording...
            </h2>
            : 

            'Record Answer'}</Button>
            <Button onClick = {()=>console.log(userAnswe)}>
                Show User Answer
            </Button>
        
    
    </div>    
  )
}


export default RecordAnswerSection