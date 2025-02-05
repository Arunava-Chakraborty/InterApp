"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Webcam from 'react-webcam'
import { Mic } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAi'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment/moment'

function RecordAnswerSection({mockInterviewQuestion , activeQuestionIndex, interviewData}) {

    const [userAnswe , setUserAnswer] = useState('');
    const {user} = useUser();
    const [loading , setLoading] = useState(false);

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


        useEffect(()=>{
                if(!isRecording&&userAnswe.length>10){
                    UpdateUserAnswer();
                }
        },[userAnswe])

        const StartStopRecording = async()=>{
            if(isRecording){ 
                stopSpeechToText()

            }
            else{
                startSpeechToText()
            }
        }


        const UpdateUserAnswer = async()=>{

                
                setLoading(true)
                console.log(userAnswe);

                 
                const feedbackPrompt = "Question:"+mockInterviewQuestion.questions[activeQuestionIndex]?.question+", User Answer:"+userAnswe+", Depends on question and user answer for given interview question "+
                "please give us rating for answer and feedback as a area of improvemrnt if any"+
                "in just 3 to 5 line to improve it in JSON format with rating 1 to 10 field and feedback field"; 
                
                

                try{
                    const result = await chatSession.sendMessage(feedbackPrompt);
                    const jsonResponseText = await result.response.text();
                    const cleanedResponse = jsonResponseText.replace(/```json|```/g, '');
                    const JsonFeedbackResp = JSON.parse(cleanedResponse);
                

                //const mockJsonResp = (result.response.text()).replace('```json','').replace('```' , '')
                //console.log(mockJsonResp);

                //const JsonFeedbackResp = JSON.parse(mockJsonResp);

                const resp = await db.insert(UserAnswer).values({
                    mockIdRef:interviewData?.mockId,
                    question:mockInterviewQuestion.questions[activeQuestionIndex]?.question,
                    correctAns:mockInterviewQuestion.questions[activeQuestionIndex]?.answer,
                    userAns:userAnswe,
                    feedback:JsonFeedbackResp?.feedback,
                    rating:JsonFeedbackResp?.rating,
                    userEmail:user?.primaryEmailAddress?.emailAddress,
                    createdAt:moment().format('DD/MM/yyyy')
                })
                
                if(resp){
                    toast("Your Answer Saved Successfully");
                }
                
        }catch(error){
            console.error("Error Updating user Answer" , error);
            toast('Failed to save your answer. Please Try Again Later');

        }finally{
            setLoading(false);
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

        <Button 
        disabled = {loading}
        variant = 'outline' className = "my-11"
        onClick = {StartStopRecording}

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
}

export default RecordAnswerSection