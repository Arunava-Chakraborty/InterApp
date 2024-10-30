import { index } from "drizzle-orm/mysql-core";
import React from "react";

function QuestionsSection({mockInterviewQuestion}){

    return(
        <div className="p-5 border rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" >
                {mockInterviewQuestion&&mockInterviewQuestion.questions.map((question , index)=>(
                    <h2 className="p-2 bg-secondary rounded-full text-center cursor-pointer
                                   text-xs md:text-sm
                    ">Questions #{index+1}</h2>
                ))}
            </div> 

        </div>
       
    );
}

export default QuestionsSection; 