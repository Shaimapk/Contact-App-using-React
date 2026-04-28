import { TrashIcon } from '@heroicons/react/16/solid'
import user from '../images/pp1.jpg'
import { Link } from 'react-router-dom';

export default function ContactCard(props) {
    const contact=props.contact;
    const{id,name,email}=contact;

  return (
    
     <div key={id} className='flex justify-between items-center w-full border-b-gray-800 shadow-md p-5'>
        <Link to={`/contact/${id}`} state={contact}>
            <div className='p-4 w-full flex items-center'>
                <img src={user} alt="user" className='w-15 h-15 rounded-full' />
                <div className='p-4'>
                    <div className='font-semibold'>{name}</div>
                    <div className='text-gray-600'>{email}</div>
                </div>
            </div>
        </Link>
        <TrashIcon onClick={()=>props.clickHandler(id)} className='w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer' />
    </div>
  )
}
