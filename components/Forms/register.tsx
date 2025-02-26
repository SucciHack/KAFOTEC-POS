"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
// import CustomCarousel from "../custom-corousel";
import TextInput from "../Form-inputs/text-input";
import SubmitButton from "../Form-inputs/submit-button";
import ImageInput from "../Form-inputs/imageUpload";
import CustomCarousel from "../custom-corousel";
import toast from "react-hot-toast";
export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};
export default function Register() {
  const initialImage ="/avatar-profile.jpg";
  const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInputProps>();
  async function onSubmit(data: RegisterInputProps) {
    console.log(data)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    setIsLoading(true)
    try {
      const user = await fetch(`${baseUrl}/api/v1/users`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
      })
      if(user.status === 201){
        toast.success("Account created successfully")
        reset()
      }
    } catch (error) {
        console.log(error)
        toast.error("failed to create user")
    }finally{
        setIsLoading(false)
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative overflow-hidden">
      <div className="flex items-center justify-center py-2">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold text-blue-500">Create an Account</h1>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
            <TextInput
              label="Full Name"
              register={register}
              name="fullName"
              errors={errors}
              placeholder="eg John Doe"
            />
            <TextInput
              label="Email Address"
              register={register}
              name="email"
              type="email"
              errors={errors}
              placeholder="Eg. johndoe@gmail.com"
            />
            <TextInput
              label="Phone Number"
              register={register}
              name="phone"
              type="tel"
              errors={errors}
              placeholder=""
            />
            <TextInput
              label="Password"
              register={register}
              name="password"
              type="password"
              errors={errors}
              placeholder="******"
            />
            </div>
            <div>
                <ImageInput
                    title="Profile Photo"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    endpoint="profileImage"
                />
            </div>

            <SubmitButton
              title="Sign Up"
              loading={isLoading}
              loadingTitle="Creating Account please wait..."
            />
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/logIn" className="underline">
              Login
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
