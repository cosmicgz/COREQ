import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


function TopProjectList() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [recommendedProjects, setRecommendedProjects] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        const fetchRecommendedProjects = async () => {
            try {
                console.log(Cookies.get('userId'))
                const response = await axios.get(
                    `${apiUrl}/feed/recommendedProjects`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setRecommendedProjects(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecommendedProjects();
    }, []);
    return (
        <div>
            {
                recommendedProjects.map(user => <SuggestedProject
                    key={user._id}
                    name={user.userFullName}
                    userName={user.username}
                    userImage={user.profilePic}
                    projTitle={user.title}
                    profileImage={user.profilePic}
                ></SuggestedProject>)
            }
        </div>
    )
}

function SuggestedProject({ name, userName, profileImage, projTitle }) {
    const [profile, setProfile] = useState(profileImage ? 'http://127.0.0.1:8081/' + profileImage : 'https://img.freepik.com/free-vector/robot-face-concept-illustration_114360-8207.jpg?size=626&ext=jpg&ga=GA1.2.600027373.1688413125&semt=ais');
  
    
      
  useEffect(() => {
    
    if (profileImage) {
      setProfile('http://127.0.0.1:8081/' + profileImage);
    }
  }, [profileImage]);
    return (
        <>
            <li className="py-2">
                <div className="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={profile} />
                    </div>
                    <div class="flex-1 min-w-0">
                        <h1 className='antialiased  hover:text-purple-700 md:text-[20px] 2xl:text-[20px]'><a href=''>{projTitle}</a></h1>
                        <p className="text-[16px]    hover:text-sky-700">
                            {name} <span className="text-[14px] text-gray-700  dark:text-gray-700">@{userName}</span>
                        </p>
                        {/* <p className="text-sm text-gray-700 truncate dark:text-gray-700">
                            @{userName}
                        </p> */}
                    </div>

                </div>
            </li>
        </>
    )
}

function TopProjects() {
    return (
        <>
            <div className="flex">

                <div class="max-sm:w-[175px] md:w-[180px] lg:w-[240px]  2xl:w-[376px] p-1  border border-gray-200 rounded-lg shadow  ">
                    <div class="flex items-center justify-between mb-4">
                        <h5 class="md:text-md lg:text-lg 2xl:text-3xl font-bold leading-none  ">Top Projects</h5>
                    </div>
                    <div class="flow-root">
                        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                            <TopProjectList />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopProjects;