import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

let vote=150;

function ShowPost(){
    return(
        <div className="mt-20 flex-none">
            <button ><ArrowDropUpIcon sx={{fontSize:80}}/></button>
            <h1 className='ml-6 font-bold'>{vote}</h1>
           <button ><ArrowDropDownIcon sx={{fontSize:80}}/></button>
        </div>
    )
}

export default ShowPost;