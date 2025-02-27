"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import CustomCarousel from "../custom-corousel";
import TextInput from "../Form-inputs/text-input";
import SubmitButton from "../Form-inputs/submit-button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export type LogInInputProps = {
  email: string;
  password: string;
};
export default function LogIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LogInInputProps>();
  async function onSubmit(data: LogInInputProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    setIsLoading(true)
    try {
      const response = await fetch(`${baseUrl}/api/v1/logIn`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      reset()
      if(response.status === 409){
        toast.error("wrong credentials")
      }else if(response.status === 200){
        toast.success("LoggedIn successfully")
        router.push("/dashboard/finance-page")
      }else{
        toast.error("something went wrong")
      }
    } catch (error) {
        console.log(error)
        toast.error("something went wrong try again later!!!")
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-blue-500">LogIn</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe@gmail.com"
            />
            <TextInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />

            <SubmitButton
              title="Sign Up"
              loading={isLoading}
              loadingTitle="Creating Account please wait..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Don{"'"}t have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
