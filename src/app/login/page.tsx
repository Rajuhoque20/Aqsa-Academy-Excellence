'use client'
import React, { FormEvent, useState } from 'react'
import classes from './style.module.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ErrorMessage } from 'src/utility/errorMessage';
import Notification from 'src/components/Notification/Notifcation';
export default function LoginPage() {
  const router=useRouter();
  const [loading, setLoading]=useState(false);
   
  return (
    <div className={classes.container}>
         <section className={classes.loginCardWrapper}>
        <span className={classes.title}>
          Sign in to <span>Aqsa Academy of Excellence</span> <span>!</span>
        </span>
        <small className={classes.sub_heading}>
          Sign in using your Username.
        </small>
        <form
        action={''}
          onSubmit={async(e:FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const username = formData.get("username") as string;
            const password = formData.get("password") as string;
            const params = { username, password };
            setLoading(true);
            try{

              const res=await signIn('credentials',{
                ...params,
                redirect:false,
              });
              setLoading(false);
              if(res?.error){
                Notification.error('Invalid crendetails!');
                return;
              }
               router.push("/student");

            }
            catch(error){
              ErrorMessage(error);
              setLoading(false);
            }                  
          }}
          className={classes.form}
        >
          <div className={classes.form_group}>
            <label htmlFor="username" className={classes.form_label}>
              USER NAME
            </label>
            <input
              type="text"
              name="username"
              id="username"
              required
              placeholder="Enter Username"
            />
          </div>

          <div className={classes.form_group}>
            <label htmlFor="password" className={classes.form_label}>
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter password"
            />
          </div>
          <button type="submit" disabled={loading} className={`${classes.button_confrim} hover:scale-105 transition`}>
            {loading?'CONFIRMING...':'CONFIRM'}
          </button>
        </form>
      </section>
    </div>
  )
}
