import React, { useEffect, useState } from "react";
import "./commentsection.css";
import sortByIcon from "../../assets/streamerPage/sortByIcon.svg";
import { makeRequest } from "../../Axios";
import SingleComment from "../singleComment/SingleComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

function CommentSection({ currentVideoId, currentUser }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (comm) => {
      return makeRequest.post("/comments", comm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });

  const [comment, setComment] = useState("");

  const handleSend = async () => {
    mutation.mutate({ desc: comment, videoId: currentVideoId });
  };

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["comment"],
    queryFn: () =>
      makeRequest.get(`comments/${currentVideoId}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  }, [currentVideoId,refetch]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="commentSection">
      <div className="commSecTop">
        <div className="commHeader">
          <p>{data?.length} comments</p>
          <p>
            <span>
              <img src={sortByIcon} alt="" />
            </span>
            Sort by
          </p>
        </div>
        <div className="commentInput">
          <img src={currentUser?.img} alt="" />
          <input
            type="text"
            placeholder="Add a comment..."
            name="desc"
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
      {data?.map((comment) => (
        <SingleComment comment={comment} key={comment._id} />
      ))}
    </div>
  );
}

export default CommentSection;

// {
//   /* {comment.map((comment) => (
//         <div className="commentMain" key={comment._id}>
//           <img src={userAvatar} alt="" />
//           <div className="commentMainRHS">
//             <div className="commentUser">
//               <p>@josephedwards8397</p>
//               <p>2 months ago</p>
//             </div>
//             <p className="comment">
//               {comment.desc}
//             </p>
//             <div className="commentReact">
//               <div className="likedComm">
//                 <img src={likedIcon} alt="" />
//                 <p>26K</p>
//               </div>
//               <img src={unlikedIcon} alt="" />
//             </div>
//           </div>
//         </div>
//       ))} */
// }
