import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi"
import { useForm } from "react-hook-form";
import { schemaLogin } from "@/components/inputs/auth/login.schema";
import { IUser } from "@/interface/user.interface";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import useCookie from "@/hooks/useCookie";
import { useRouter } from 'next/router'
export default function Login(){
    const router = useRouter();
    const [auth, setAuth] = useCookie("auth", "")
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit, formState : {errors}} = useForm<IUser>({
        resolver : joiResolver(schemaLogin)
    })

    const onSubmit = async (data : IUser) => {
     
      
        try {
            setLoading(true);
            const response = await axios.post("https://hungvu.site/login", data);
            if(response.data.status == 'success'){
                setAuth(response.data.refresh_token);
                toast.success(`Welcome to comeback`);
                router.push('/product', undefined, { shallow: true })
            }else {
                toast.error('Email or password is incorrect')
            }
           
        } catch (error) {
            toast.error('Something went error');
        }finally{
            setLoading(false);
        }
        
    }
    return (<div className="app__login--form" >
         <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h3>Login Here</h3>

        <label className="label">Email</label>
        <input {...register('email')} className="input-app-custom" type="email" placeholder="Email" />
        
        {errors?.email && <span className="handle-error-form">* {errors.email.message}</span>}
        <label className="label" >Password</label>
        <input {...register('password')}  className="input-app-custom" type="password" placeholder="Password" />
        {errors?.password && <span className="handle-error-form">* {errors.password.message}</span>}
        <button type="submit" disabled={loading} className="button-app-custom">{loading ? 'Loging' : 'Log In'}</button>
        
    </form>
    </div>
 
    )
}