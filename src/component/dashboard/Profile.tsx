import { Link } from 'react-router-dom'
import {AiOutlineStar} from 'react-icons/ai';
const Profile = () => {


    return (
        <div className=" w-[calc(100%-14rem)]  float-right h-screen bg-red bg-slate-100">
            <div className="dashboard-home flex bg-white main-profile w-4/5 mt-14 mx-auto  rounded shadow-xl" style={{ height: '90vh' }}>

                <div className=' mx-auto w-full'>
                    <div className=' h-1/5 bg-gradient-to-r from-slate-50 to-blue-100'></div>
                    <div className=' w-11/12 p-0  h-4/5 mx-auto'>

                        <div className='h-3/5 main '>
                            <div className='profile flex w-2/5 space-x-4 items-center'>
                                <div className="h-40 float-left  w-40 -mt-12 border-4 border-gray-400 profile-img align-center bg-no-repeat bg-center bg-cover rounded-full" style={{ backgroundImage: `url('https://media.istockphoto.com/id/1040308104/photo/mature-handsome-business-man.jpg?s=612x612&w=0&k=20&c=QbyH3XFmLOoy8NESjLQC8PYsm6g3UBL6COFaF-Qnnbk=')` }}>
                                </div>
                                <div>
                                    <h1 className=" text-sm   text-left text-gray-700 text-2xl font-bold ">Rohan Kumar Mainali</h1>
                                
                                       <p className='text-sm text-left'> Joined : 2012/12</p>
                                </div>

                            </div>
                            <div className='details w-3/4 mx-auto'>
                                <div className='sub-details flex float-left  space-x-24 justify-center '>
                                <div className= 'left-info'>
                                    <div className='basic-info flex p-3 '>
                                       <div className= 'verify-left '>

                                        <p className='text-left text-lg'>Email: </p>
                                        <p className='text-left text-lg'>Role: </p>
                                        <p className='text-left text-lg'>User verification: </p>
                                        <p className='text-left text-lg'>Approve to drive ?</p>
                                        <p className='text-left text-lg'>Email address </p>
                                        <p className='text-left text-lg'>Phone number</p>

                                        </div>
                                       <div className= 'verify-right '>
                                        <p className='text-right text-lg '>rohanmainali@gmail.com</p>
                                        <p className='text-right text-lg '>User </p>
                                        <p className='text-right text-lg text-red-400'>Pending </p>

                                        <p className='text-right text-lg text-indigo-500'>Verify license</p>
                                        <p className='text-right text-lg text-indigo-500'>Verify Email address </p>
                                        <p className='text-right text-indigo-500 '>Verify Number</p>

                                        </div>

                                            
                                            </div>

                        <Link to="/dashboard/change-password"><button className="w-3/4 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">Change Password</button></Link>
                                            </div>


                                    <div className='reviews'>
                                      <h1  className='text-2xl  text-left font-semibold text-gray-700' > Reviews</h1>
                                      <div className= 'review section'>
                                          <div className = 'stars flex mt-2'>
                                                <li className='list-none'><AiOutlineStar/></li>
                                                <li className='list-none'><AiOutlineStar/></li>
                                                <li className='list-none'><AiOutlineStar/></li>
                                                <li className='list-none'><AiOutlineStar/></li>
                                                <li className='list-none'><AiOutlineStar/></li>
                                          </div>
                                          <div className= 'review-details'>
                                             <span><h2 className = 'text-sm text-gray-700 font-semibold'>No reviews yet</h2></span>

                                          </div>
                                      </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                
 
                    </div>


                </div>

            </div>
        </div>


    )
}


export default Profile
