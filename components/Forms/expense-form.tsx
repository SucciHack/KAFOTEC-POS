"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageInput from "../Form-inputs/imageUpload"
import toast from "react-hot-toast"
import { Loader } from "lucide-react"

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
  description: z.string().optional(),
  receiptUrl: z.string().optional(),
})

export default function ExpenseForm() {
    const initialImage ="/placeholder.svg";
    const [imageUrl, setImageUrl] = useState(initialImage);
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: 0,
      description: "",
      receiptUrl: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    values.receiptUrl = imageUrl
    setIsLoading(true)
    try {
      const response = await fetch("/api/v1/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      if(response.status === 201){
        toast.success("Expense created successfully")
      }

      if (response.status === 500) {
        toast.success("Failed to create expense")
        throw new Error("Failed to create expense")
      }
    } catch (error) {
      console.error("Error creating expense:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
        <p className="text-3xl text-center mb-3 mt-6">Expenses</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto items-center px-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Supplies">Supplies</SelectItem>
                  <SelectItem value="Shipping">Shipping</SelectItem>
                  <SelectItem value="Utilities">Utilities</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
              </FormControl>
              <FormDescription>Enter the expense amount in cents (e.g., 1000 for $10.00)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageInput
            title="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="productImage"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <><Loader className="animate-spin"/> Creating...</> : "Create Expense"}
        </Button>
      </form>
    </Form>
  )
}

