//import React from 'react'
import { useForm } from 'react-hook-form';
//SubmitHandler
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
//import { Feedback } from '../components/Alert';
import Feedback, { FeedbackState }from '../components/Alert';
import { postRequest, getUser } from '../utils/apis'
import {FeedbackType } from '../utils/types'
import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie, setCookie } from '../utils/cookieManager';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/userSlice';

export default function Login() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }} = useForm();

  const onSubmit = async (data: object) => {
    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 100);

    console.log(data);
    const url = `${import.meta.env.VITE_AUTH_URL}/login/`

    try {
      const response = await postRequest(url, data, false);
      console.log(response);
      if (response.ok) {
        const res = await response.json();
        setFeedback({message: "Login successful. Redirecting to dashboard",
        });
        console.log(res)
        setCookie("token", res.token);
        console.log(getCookie("token"));
        const userRes = await getUser();
        if (userRes.ok) {
          const user = await userRes.json();
          console.log(user)
          const userData = {
            'id': user.id,
            'firstName': user.first_name,
            'lastName': user.last_name,
            'isStaff': user.is_staff,
          }
          dispatch(login(userData));
        }
        setTimeout(() => {
          navigate(user.is_admin ? "/admin/dashboard" : "/dashboard")
        }, 500);
        clearInterval(progressInterval);
        setProgress(0);
      } else {
        clearInterval(progressInterval);
        setProgress(0);
        const res = await response.json();
        console.log(res)
        if (res.detail === "User account not verified.") {
          console.log(response);
          setFeedback({variant: 'warning', message: "Please verify your email and try again"});
        } else if (res.detail === "Unable to login with provided credentials."){
          console.log(response);
          setFeedback({variant: 'error', message: "Incorrect email or password"});
        }
      }
    } catch (error) {
        clearInterval(progressInterval);
        setFeedback({variant: 'error', message: "An error occured please try again"});
        console.log(error);
    } finally {
      setTimeout(() => {
        setFeedback(null)
      }, 5000);
    }
  }
  return (
    <>
    {feedback && <Feedback variant={feedback.variant} message={feedback.message} className={"text-center bg-green-200"}/>}
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" method="POST">

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input {...register('email', {
                required: "Please enter your email"})}
                id="email" type="email" autoComplete="email" className="mt-1"
              />
              {errors?.email?.message && <span className='text-red-500 text-xs'>{errors?.email?.message.toString()}</span>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="new-password" className="mt-1"
                {...register('password', {
                  required: "Please enter your password"})}
              />
              {errors?.password?.message && <small style={{color: "red"}}>{errors.password.message.toString()}</small>}
            </div>

            <div>
              <Button type="submit" className="w-full">Sign up</Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign up with Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign up with Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Sign up with GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </ >
  )
}
