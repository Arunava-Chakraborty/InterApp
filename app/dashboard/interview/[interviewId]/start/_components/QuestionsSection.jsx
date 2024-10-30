import { index } from "drizzle-orm/mysql-core";
import { Lightbulb } from "lucide-react";
import React from "react";

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}){

    return  mockInterviewQuestion&&(
        <div className="mt-3 p-5 border rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
                {mockInterviewQuestion&&mockInterviewQuestion.questions.map((question , index)=>(
                    <h2 className={`p-2 bg-secondary rounded-full text-center cursor-pointer
                                   text-xs md:text-sm ${activeQuestionIndex==index&& ' bg-blue-700 text-white'}`}>Questions #{index+1}</h2>
                ))}
            </div> 

            <h2  className="  mt-14 text-md md:text-lg text-center">
                {mockInterviewQuestion.questions[activeQuestionIndex]?.question}
            </h2>

            <div className="border rounded-lg mt-28 p-5 bg-blue-50">
                <h2 className="flex gap-2  text-blue-800">
                    <strong><Lightbulb/></strong>
                    <strong>Note:</strong>
                </h2>
                <p className="flex my-2 mx-2 text-blue-800">
                    <strong>{process.env.NEXT_PUBLIC_INFORMATION_QUESTION}</strong>
                </p>
            </div>

        </div>
       
    );
}

export default QuestionsSection; 