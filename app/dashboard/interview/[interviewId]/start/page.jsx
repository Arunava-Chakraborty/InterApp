"use client"
import React, { useEffect, useState } from "react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";


function StartInterview({params}){
    const[interviewData , setInterviewData] = useState();
    const [mockInterviewQuestion , setMockInterviewQuestion] = useState();
    const [activeQuestionIndex , setActiveQuestionINdex] = useState(0);

    useEffect(()=>{ 
            GetInterviewDetails();
    },[]);


    const GetInterviewDetails = async() =>{
        
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockID, params.interviewId))

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp)

        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        
    }
    return(
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/*Questions*/}

                    <QuestionsSection 
                    
                    mockInterviewQuestion = {mockInterviewQuestion}
                    activeQuestionIndex = {activeQuestionIndex}
                    />

                    {/*Video / Audio Recording*/}
                    <RecordAnswerSection
                     mockInterviewQuestion = {mockInterviewQuestion}
                     activeQuestionIndex = {activeQuestionIndex}
                     interviewData = {interviewData}
                    />

            </div>
            
        </div>
    )
}

export default StartInterview 