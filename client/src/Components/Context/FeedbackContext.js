import { createContext, useEffect, useState} from "react";

//this is the state
const FeedbackContext = createContext();

//enclose this function around the component which will use
//FeebackContext as state 
export const FeedbackProvider=({children})=>{
    const [isLoading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([]);

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    });

    useEffect(()=>{
        fetchFeedbacks();
    },[]);

    const fetchFeedbacks = async () => {
        const response = await fetch("/feedback");
        const data = await response.json();
        setFeedbacks(data);
        setLoading(false);
    }


    function EditHandler(x){
        console.log(x)
        setFeedbackEdit({
            item:x,
            edit:true,
        });
    }

    const deleteFeedback = async (_id) => {
        const response = await fetch(`/feedback/${_id}`, {method: "DELETE"});
        const data = await response.json();
        setFeedbacks(data);
    }


    const addFeedback = async (fb)=>{
        const response = await fetch("/feedback", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fb),
        });
        const data = await response.json();
        setFeedbacks([...feedbacks,data]);

    }

    const updateFeedback = async (ID,fb)=>{
        console.log(ID)
        const response = await fetch(`/feedback/${ID}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(fb)
        })
        const data = await response.json();
        setFeedbacks(data);

    }

    return (
        <FeedbackContext.Provider value={{feedbacks,isLoading, deleteFeedback, addFeedback, EditHandler, feedbackEdit, updateFeedback}}>
            {children}
        </FeedbackContext.Provider>
    );

}

export default FeedbackContext;