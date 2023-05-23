import React, { useEffect, useState } from 'react'
import getPlace from '../../components/functions/GetPlace';
import './style.css';

const URL = "http://localhost:4000/"
const SettingsForm = () => {
        const userString = localStorage.getItem('user');
        const userObject = JSON.parse(userString);
        const userId = userObject._id;
        const [user, setUser] = useState({
                name:'',
                email:'',
                password:'',
                phone:'',
                birthday:'',
                wilaya:'',
                daira:'',
                baladia:'',
                sport:'',
                typeOfUser:'club',
                gender:'mix'
        });
        const [admin, setAdmin] = useState({});
        const [checkPassword,setCkeckPassword] = useState('')
        const [currentPassword,setCurrentPassword] = useState('')
        const [error,setError] = useState('');
        const [jsonMessage,setJsonMessage] = useState('');

        const handleChange = (e) => {
                setUser({...user,[e.target.name]:e.target.value})
        }

        const getUserInfo = () => {
                const storedUser = localStorage.getItem('user');
                setAdmin(JSON.parse(storedUser));
        };

        //  HERE ALL BACKAND CODES 
        const handleName =  async (e) => {
                e.preventDefault();
                if (user.name.length < 6) {
                        setError('nameError')
                } else {
                        setError('')
                        //const formData = new FormData();
                       // formData.append('name',user.name)
                        const data = {name:user.name}
                        const urll = `${URL}edit/${userId}`
                        await fetch(urll,{     
                        method: "PUT", 
                        headers: {
                                "Content-Type": "application/json",       
                              },
                        body: JSON.stringify(data)}
                        )
                }
        }



        const handleMail = async (e) => {
                e.preventDefault();
                if (!user.email) {
                  setError('mailError')
                } else {
                  setError('')
                  const data = { email: user.email };
                  const url = `${URL}edit/${userId}`;

                  await fetch(url,{     
                        method: "PUT", 
                        headers: {
                                "Content-Type": "application/json",       
                              },
                        body: JSON.stringify(data)}
                        )
                }
                }
              
              





      /*  const handleMail = async (e) => {
                e.preventDefault();
                if (!user.email) {
                        setError('mailError')
                } else {
                        setError('')
                        const formData = new FormData();
                        formData.append('email',user.email)
                        // HERE BACKEND CODE


                }
        }*/

        const handlePhone = async (e) => {
                e.preventDefault();
                if (user.phone.length !== 10) {
                        setError('phoneError')
                } else {
                        setError('')
                        const data = { phone: user.phone };
                        const url = `${URL}edit/${userId}`;
      
                        await fetch(url,{     
                              method: "PUT", 
                              headers: {
                                      "Content-Type": "application/json",       
                                    },
                              body: JSON.stringify(data)}
                              )

                }
        }

        const handleDate = async (e) => {
                e.preventDefault();
                if (!user.birthday) {
                        setError('dateError')
                } else {
                        setError('')
                        const data = { birthday: user.birthday };
                        const url = `${URL}edit/${userId}`;
      
                        await fetch(url,{     
                              method: "PUT", 
                              headers: {
                                      "Content-Type": "application/json",       
                                    },
                              body: JSON.stringify(data)}
                              )
                        
                        // HERE BACKEND CODE
                }
        }

        const handleSport = async (e) => {
                e.preventDefault();
                if (!user.sport) {
                        setError('sportError')
                } else {
                        setError('')
                        const data = { sport: user.sport };
                        const url = `${URL}edit/${userId}`;
      
                        await fetch(url,{     
                              method: "PUT", 
                              headers: {
                                      "Content-Type": "application/json",       
                                    },
                              body: JSON.stringify(data)}
                              )
                    
                }
        }

        const handleGender = async (e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append('gender',user.gender)
                // HERE BACKEND CODE
        }

        const handlePlace = async (e) => {
                e.preventDefault();
                if (!user.wilaya) {
                        setError('wilayaError')
                } else if (!user.daira) {
                        setError('dairaError')
                } else {
                        setError('')
                       /* const formData = new FormData();
                        formData.append('wilaya',user.wilaya)
                        formData.append('daira',user.daira)
                        formData.append('baladia',user.baladia)
                        // HERE BACKEND CODE
                        const data = { sport: user.sport };
                        const url = `${URL}edit/${userId}`;
      
                        await fetch(url,{     
                              method: "PUT", 
                              headers: {
                                      "Content-Type": "application/json",       
                                    },
                              body: JSON.stringify(data)}
                              )*/
                              const data = {
                                wilaya: user.wilaya,
                                daira: user.daira,
                                baladia: user.baladia
                              };
                              


                              
                              const url = `${URL}edit/${userId}`;
            
                              await fetch(url,{     
                                    method: "PUT", 
                                    headers: {
                                            "Content-Type": "application/json",       
                                          },
                                    body: JSON.stringify(data)}
                                    )
                }
        }

        const handlePassword = async (e) => {
                e.preventDefault();
                if (user.password.length < 8) {
                        setError('passwordError')
                } else if (user.password !== checkPassword) {
                        setError('checkPasswordError')
                } else {
                        setError('')
                        
                     const data={password: user.password,curpass: currentPassword}
                     const url=`${URL}editpassword/${userId}`
                     await fetch(url,{     
                        method: "PUT", 
                        headers: {
                                "Content-Type": "application/json",       
                              },
                        body: JSON.stringify(data)}
                        )
                        // HERE BACKEND CODE
                }
        }

        useEffect(()=>{
                getPlace('wilayaSelect1','dairaSelect1','baladiaSelect1');
                getUserInfo();
        },[])

        return (
                <>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handleName}>
                                <h3 className=' font-semibold text-lg'>تغيير إسم المستخدم</h3>
                                <input type="text" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'nameError' ? 'red-border':null}`} onChange={handleChange} name="name" placeholder='الاسم الجديد' />
                                <small className={error ==='nameError' ? ' text-red-700 block w-full':'hidden'}>يجب أن يكون الإسم أطول من 6 أحرف</small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handleMail} >
                                <h3 className='font-semibold text-lg' >تغيير البريد الالكتروني</h3>
                                <input type="email" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'mailError' ? 'red-border': null}`} name="email"  onChange={handleChange} placeholder='البريد الالكتروني' />
                                <small className={error ==='mailError' ? ' text-red-700 block w-full':'hidden'}>يجب ملئ الحقل</small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handlePhone} >
                                <h3 className='font-semibold text-lg' >تغيير رقم الهاتف</h3>
                                <input type="number" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'phoneError' ? 'red-border': null}`} name="phone"  onChange={handleChange} placeholder='رقم الهاتف' />
                                <small className={error ==='phoneError' ? ' text-red-700 block w-full':'hidden'}>رقم الهاتف يتكون من عشر ارقام</small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handleDate} >
                                { admin.typeOfUser === 'club' ?
                                        <h3 className='font-semibold text-lg' > تاريخ تأسيس النادي</h3>
                                        : <h3 className='font-semibold text-lg' > تاريخ الميلاد </h3>
                                }
                                <input type="date" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'dateError' ? 'red-border': null}`} name="birthday"  onChange={handleChange} />
                                <small className={error ==='dateError' ? ' text-red-700 block w-full':'hidden'}>يجب تحديد التاريخ أولا</small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handlePassword} >
                                <h3 className='font-semibold text-lg' >تغيير كلمة السر</h3>
                                <input type="password" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'passwordErr' ? 'red-border': null}`} name="currentPassword"  onChange={(e)=> setCurrentPassword(e.target.value)} placeholder='كلمة السر الحالية' />
                                <small className={error ==='mailror' ? ' text-red-700 block w-full':'hidden'}>كلمة السر الحالية غير صحيحة</small>
                                <input type="password" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'passwordError' ? 'red-border': null}`} name="password"  onChange={handleChange} placeholder='كلمة السر الجديدة' />
                                <small className={error ==='passwordError' ? ' text-red-700 block w-full':'hidden'}>كلمة السر يجب أن تتجاوز 8 أحرف</small>
                                <input type="password" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'checkPasswordError' ? 'red-border': null}`} name="checkedPassword"  onChange={e => setCkeckPassword(e.target.value)} placeholder='تأكيد كلمة السر ' />
                                <small className={error ==='checkPasswordError' ? ' text-red-700 block w-full':'hidden'}>كلمتي السر غير متطابقتين</small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        <form className='places flex flex-col gap-2 bg-white rounded-lg px-3 py-4' onSubmit={handlePlace}>
                                { admin.typeOfUser === 'club' ?
                                        <h3 className='font-semibold text-lg text-center' >موقع النادي </h3>
                                        : <h3 className='font-semibold text-lg text-center' >مكان السكن</h3>
                                }
                                <div className="wilaya">
                                        <label htmlFor="wilaya" className=' ml-1' >الولاية</label>
                                        <select name="wilaya" id="wilaya" onChange={handleChange} defaultValue={document.querySelectorAll('#wilaya option')[0]} className={`wilayaSelect1 ${error === 'wilayaError' ? 'red-border': null} `}>
                                        </select>
                                        <small className={error ==='wilayaError' ? ' text-red-700 block w-full':'hidden'}>يجب اختيار الولاية أولا</small>
                                </div>
                                <div className="daira">
                                        <label htmlFor="daira" className=' ml-1' >الدائرة</label>
                                        <select name="daira" id="daira" onChange={handleChange} defaultValue={document.querySelectorAll('#daira option')[0]} className={`dairaSelect1 ${error === 'dairaError' ? 'red-border': null}`}>
                                        </select>
                                        <small className={error ==='dairaError' ? ' text-red-700 block w-full':'hidden'}>يجب اختيار الدائرة</small>
                                </div>
                                <div className="baladia">
                                        <label htmlFor="baladia" className=' ml-1' >البلدية</label>
                                        <select name="baladia" id="baladia" onChange={handleChange} defaultValue={document.querySelectorAll('#baladia option')[0]} className={`baladiaSelect1`}>
                                        </select>
                                        <small className='block text-gray-700'> اختيار البلدية اختياري </small>
                                </div>
                                <button className="search">بحث</button>
                        </form>
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handleSport} >
                                { admin.typeOfUser === 'club' ?
                                        <h3 className='font-semibold text-lg' > رياضة النادي</h3>
                                        : <h3 className='font-semibold text-lg' > رياضتك المفضلة</h3>
                                }
                                <input type="text" className={`w-full rounded-lg mt-3 bg-gray-100 ${error === 'sportError' ? 'red-border': null}`} name="sport" placeholder={admin.typeOfUser === 'club' ? 'رياضة النادي' : 'رياضتك المفضلة'}  onChange={handleChange} />
                                <small className={error ==='sportError' ? ' text-red-700 block w-full':'hidden'}>يجب ملئ الحقل </small>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        { user.typeOfUser === 'user' &&
                        <form className=' bg-white rounded-lg px-3 py-4 text-center' onSubmit={handleGender}>
                                <h3 className=' font-semibold text-lg'>تغيير الجنس</h3>
                                <select name="gender" id="gender" onChange={handleChange} required>
                                        <option value="man" selected>ذكر</option>
                                        <option value="woman">انثى</option>
                                </select>
                                <button className='rounded-md text-white px-4 py-3 mt-3'>تغيير</button>
                        </form>
                        }
                </>
        )
}

export default SettingsForm