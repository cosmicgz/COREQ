import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {VoteCount,VoteStatus} from '../Static/VoteChecking';
import PostBar from '../Static/PostBar';
import PDFViewer from '../Static/PdfViewer';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function CommentShow() {
  return (
    <>

    </>
  )
}


function PostShow({userId, name, profileImage, description, vote, tag, postDate,voteStatus, postId }) {
  const [profile, setProfile] = useState("");
  
      useEffect(() => {
    
        if(profileImage!=undefined){
          setProfile('http://127.0.0.1:8081/'+profileImage);
        }
        else{
          setProfile('https://img.freepik.com/free-vector/robot-face-concept-illustration_114360-8207.jpg?size=626&ext=jpg&ga=GA1.2.600027373.1688413125&semt=ais');
    
    }}, []); // Empty dependency array ensures this runs only once on component mount
  return (
    <>
      <div className=" w-full  p-4 border border-gray-300 rounded-lg mt-5">
        <div className="grid grid-rows-10 gap-4 ">
          <div className="row-span-2 grid grid-cols-5 ">
            <div className="flex col-span-4">
              <img
                className="h-9 w-9 2xl:h-12 2xl:w-12 rounded-full mr-5 max-sm:mr-4  max-sm:h-9 max-sm:w-9"
                src={profile}
              ></img>
              <Link to={`/profile/${userId}`} key={userId}>   <div className="">
                <a href="" className="2xl:text-[25px]">
                  {name}
                </a>
                <p className="font-k2d 2xl:text-[20px]">{tag}</p>
              </div> </Link>
            </div>
            <div className="col-span-1 ">
              <h1 className="font-k2d text-sm 2xl:text-[20px] ">{postDate}</h1>
            </div>
          </div>
          <div className="row-span-5 flex-grow border-b border-gray-300 2xl:text-[20px] pb-7">
            <p>{description}</p>
          </div>
          <div className='row-span-1 flex-grow border-b border-gray-300 grid grid-cols-5 pb-2'>
            <div className='col-span-1 oldstyle-nums font-bold md:text-md ml-5'>
            <h1 className='font-bold md:text-[25px] ml-5'>{vote}</h1>
            </div>
            <div className='col-span-4 flex justify-end oldstyle-nums font-bold md:text-md ml-5'>
            <PostBar userId={userId} postId={postId} voteStatus={voteStatus}/>
            </div>
          </div>
          <div className='row-span-2 border border-gray-300 rounded-lg p-1 flex'>
            <h1>Openion!! comming soon</h1>
            {/* <img class="h-9 w-9 rounded-full mr-10 max-sm:mr-4 max-sm:ml-4 max-sm:h-9 max-sm:w-9" src={profileImage} alt="" />
      <input type="text" id="large-input" placeholder="CLICK HERE TO CIRCULATE ...." class="flex items-start md:text-[24px] max-sm:w-[350px] max-md:w-[350px] lg:w-[600px] 2xl:w-[900px] 2xl:h-[60px]  p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
    */}
          </div>
        </div>
      </div>
    </>
  );
}

function ProfileQueries() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [queries, setQueries] = useState([]);

  const token = Cookies.get('token');
  const { userId } = useParams();

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${apiUrl}/query/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const queriesData = response.data;
        const formattedQueries = queriesData.map(query => {
          return {
            ...query,
            createdAt: new Date(query.createdAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' }) //, year: 'numeric'
          };
        });
        setQueries(formattedQueries);

      } catch (error) {
        console.log(error);
      }
    };

    fetchQueries();
  }, []);
  return (
    <>
      {queries.map((query) => (
        <PostShow
          name={query.userFullName}
          userName={query.username}
          profileImage={query.profilePic}
          title={query.title}
          description={query.description}
          vote={VoteCount({ votes: query.votes})}
          voteStatus={VoteStatus({ votes: query.votes})}
          tag={query.tag}
          postDate={query.createdAt}
          userId={query.userId}
          postId={query._id}
        ></PostShow>
      ))}
    </>
  );
}




export default ProfileQueries;