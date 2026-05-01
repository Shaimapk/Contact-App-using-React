

export default function DeleteConfirmModel({onConfirm,onCancel}) {
  
    return (
    <div className="fixed inset-0 w-full flex justify-center items-center">
        <div className="bg-white p-4 text-center w-1/2 shadow rounded-xl">
            <div className="text-lg">Are you sure want delete?</div>
            <button onClick={onCancel} className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition m-5" >Cancel</button>
            <button onClick={onConfirm} className="p-2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition m-5">Delete</button>
        </div>
    </div>
  )
}
