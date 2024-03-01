import Sidebar from "../Dashboard_Components/SideBar";
import '../AnalyticsAndSettings_Components/Analytics_Settings.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
    const navigate  = useNavigate();

    if(localStorage.getItem('token')===null){
        navigate('/login');
    }
    const [errorPassword, seterrorPassword] = useState(false)
    const [formData, setFormData] = useState({ name: '', oldPassword: '', newPassword: '' });
    const handleChange = (e) => {
        console.log(e.target.value)
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (e.target.id === 'newPassword' && e.target.value.length <= 4) {
            seterrorPassword(true)
        }
        else seterrorPassword(false)
    };

    const handleuserdatachange =async (e)=>{

        
        e.preventDefault();
        const url = `https://pro-manage-61b10a19ae77.herokuapp.com/user/updateuser/`;
        console.log("asa"+JSON.stringify(formData))

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });

           
            if (response.ok) {
                toast.success("Data updated sucessfully.");
                console.log('change userdata sucessfully');
            } else {
             toast.error("Invalid creds or Please Provide all the details");
                console.error('Signup failed:', response);
            }
        } catch (error) {
            toast.error("something went wrong. please try again");
            console.error('Error:', error.message);
        }
        finally{
            setFormData({ name: '', oldPassword: '', newPassword: '' })
        }
    };


    return (
        <div>
            <div className="top_container_settings_T1">
                <Sidebar />

                <div className="settings_form_top">
                    <h1 style={{ marginLeft: '160px' }}>Settings</h1>
                    <ToastContainer/>
                    <form className="form" onSubmit={handleuserdatachange}>

                        <div className="form-body">
                            <div className="login_signup_input">
                                <input className="form_input_name_U4" placeholder='Name' type="text" name="name" value={formData.name} onChange={handleChange} id="name" />
                            </div>
                            <div className="login_signup_input">
                                <input className="form_input_p1" placeholder='Old Password' name="oldPassword" value={formData.oldPassword} onChange={handleChange} type="password" id="oldPassword" />
                            </div>
                            <div className="login_signup_input">
                                <input className="form_input_p1" placeholder='New Password' name="newPassword" value={formData.newPassword} onChange={handleChange} type="password" id="newPassword" />
                                {errorPassword ? <div className="global_error">Passwords length should be greater than 4 </div> : ""}
                            </div>
                            <div classname="login_btn">
                                <button className="signup_btn_p1" >Update</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
export default Settings;