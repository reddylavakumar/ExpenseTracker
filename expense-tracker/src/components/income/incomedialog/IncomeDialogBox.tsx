import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/reusablecomponents/Datepicker"
import { useForm, Controller } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { addExpense } from "@/services/api/expenseApi"
import useExpenseStore from "@/store/useAppStore"

interface DialogBoxProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

type IncomeFormData = {
    title: string
    amount: string
    currency: string
    convertedAmount: string
    category: string
    notes: string
    date: Date
    image?: FileList
}

export function IncomeDialogBox({ open, onOpenChange }: DialogBoxProps) {
    const { fetchExpenses } = useExpenseStore()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch,
    } = useForm<IncomeFormData>({
        defaultValues: {
            currency: "",
            date: new Date(),
        },
    })

    const watchImage = watch("image")
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    useEffect(() => {
        const file = watchImage?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setImagePreview(null)
        }
    }, [watchImage])

    const handleFormSubmit = async (data: IncomeFormData) => {
        try {
            const incomeDate = new Date(data.date)
            if (isNaN(incomeDate.getTime())) {
                throw new Error("Invalid date provided")
            }

            const formattedData = {
                id: uuidv4(),
                title: data.title,
                amount: data.amount,
                currency: data.currency,
                convertedAmount: data.convertedAmount,
                isIncome: true,
                category: data.category,
                notes: data.notes,
                date: format(incomeDate, "dd-MM-yyyy"),
                createdAt: format(new Date(), "dd-MM-yyyy"),
                image_src:
                    imagePreview ??
                    "https://img.freepik.com/free-photo/large-mixed-pizza-with-meat_140725-1274.jpg?semt=ais_hybrid&w=740",
            }

            await addExpense(formattedData)
            await fetchExpenses()

            reset()
            setImagePreview(null)
            onOpenChange(false)
        } catch (error) {
            console.error("Failed to add income:", error)
            alert("Something went wrong while saving the income. Please try again.")
        }
    }

    return (
        <Dialog open={open} onOpenChange={(state) => {
            onOpenChange(state)
            if (!state) {
                reset()
                setImagePreview(null)
            }
        }}>
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>Add Income</DialogTitle>
                    <DialogDescription>
                        Fill in the details to record a new income.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div className="grid gap-4">
                        {/* Title & Amount */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Name of Source</Label>
                                <Input
                                    id="title"
                                    {...register("title", { required: "Title is required" })}
                                />
                                {errors.title && (
                                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={1}
                                    {...register("amount", {
                                        required: "Amount is required",
                                        min: {
                                            value: 1,
                                            message: "Amount must be at least 1",
                                        },
                                    })}
                                />
                                {errors.amount && (
                                    <span className="text-red-500 text-sm">{errors.amount.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Currency & Converted */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Controller
                                    name="currency"
                                    control={control}
                                    rules={{ required: "Currency is required" }}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="INR">INR</SelectItem>
                                                <SelectItem value="EUR">EUR</SelectItem>
                                                <SelectItem value="USD">USD</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.currency && (
                                    <span className="text-red-500 text-sm">{errors.currency.message}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="convertedAmount">Converted Amount</Label>
                                <Input
                                    id="convertedAmount"
                                    type="number"
                                    {...register("convertedAmount", {
                                        required: "Converted amount is required",
                                    })}
                                />
                                {errors.convertedAmount && (
                                    <span className="text-red-500 text-sm">
                                        {errors.convertedAmount.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Category & Notes */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input
                                    id="category"
                                    {...register("category", { required: "Category is required" })}
                                />
                                {errors.category && (
                                    <span className="text-red-500 text-sm">{errors.category.message}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    rows={1}
                                    maxLength={200}
                                    {...register("notes")}
                                />
                            </div>
                        </div>

                        {/* Date Picker */}
                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Controller
                                name="date"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker date={field.value} setDate={field.onChange} />
                                )}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="grid gap-2">
                            <Label htmlFor="image">Upload Image</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                {...register("image")}
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded-md border mt-2 h-32 object-cover"
                                />
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => {
                                    reset()
                                    setImagePreview(null)
                                }}
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
