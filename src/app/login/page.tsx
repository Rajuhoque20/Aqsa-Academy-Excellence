'use client'
import React from 'react'
import classes from './style.module.css';
import { useRouter } from 'next/navigation';
export default function LoginPage() {
    const router=useRouter();
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
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target.elements;
            const username = form.username.value;
            const password = form.password.value;
            const params = { username, password };
            router.push("/dashboard");

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

          <button type="submit" className={classes.button_confrim}>
            CONFIRM
          </button>
        </form>
      </section>
    </div>
  )
}
