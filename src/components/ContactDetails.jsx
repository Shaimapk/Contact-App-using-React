import { Link, useLocation, useParams } from "react-router-dom";
import image from '../images/pp1.jpg'


export default function ContactDetails(contacts) {

const location = useLocation();
const { id } = useParams();

const contact = location.state || contacts.find(item=>item.id.toString()===id)

  return (
    <div className="w-full mt-24 flex flex-col items-center">
        <div className="w-72 border border-gray-200 shadow-md rounded-2xl p-4 m-5 transform transition duration-500 hover:scale-103">
            <img src={image} alt="image" className="mx-auto block" />
            <div className="text-xl font-bold text-center">{contact.name}</div>
            <div className="text-lg text-center text-gray-500">{contact.email}</div>
        </div>
        <Link to={'/'}>
            <button className="p-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700">Back to Contact List</button>
        </Link>
    </div>
  )
}
