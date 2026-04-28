import { TrashIcon } from '@heroicons/react/16/solid'
import user from '../images/pp1.jpg'

export default function ContactCard(props) {

    const{id,name,email}=props.contact;

  return (
     <div key={id} className='flex justify-between items-center w-full border-b-gray-800 shadow-md p-5'>
        <div className='p-4 flex items-center'>
            <img src={user} alt="user" className='w-15 h-15 rounded-full' />
            <div className='p-4'>
            <div className='font-semibold'>{name}</div>
            <div className='text-gray-600'>{email}</div>
            </div>
        </div>
        <TrashIcon onClick={()=>props.clickHandler(id)} className='w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer' />
    </div>
  )
}
