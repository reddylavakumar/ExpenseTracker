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

interface DialogBoxProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmitData: (data: any) => void // pass final formatted data out
}

type ExpenseFormData = {
    title: string
    amount: string
    currency: string
    convertedAmount: string
    category: string
    notes: string
    date: Date
}

export function ExpenseDialogBox({ open, onOpenChange, onSubmitData }: DialogBoxProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ExpenseFormData>({
        defaultValues: {
            currency: "",
            date: new Date(),
        },
    })

    const onSubmit = (data: ExpenseFormData) => {
        const formattedData = {
            id: uuidv4(),
            title: data.title,
            amount: data.amount,
            currency: data.currency,
            convertedAmount: data.convertedAmount,
            isIncome: false,
            category: data.category,
            notes: data.notes,
            date: format(data.date, "dd-MM-yyyy"),
            createdAt: format(new Date(), "dd-MM-yyyy"),
            image_src: "https://img.freepik.com/free-photo/delicious-meal-table_23-2149372049.jpg?semt=ais_hybrid&w=740",
        }

        onSubmitData(formattedData)
        reset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Expense</DialogTitle>
                    <DialogDescription>Fill in the details to record a new expense.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Spent On</Label>
                                <Input id="title" {...register("title", { required: "Title is required" })} />
                                {errors.title && <span className="text-red-500 font-semibold text-[13px]">{errors.title.message}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    min={0}
                                    {...register("amount", { required: "Amount is required" })}
                                />
                                {errors.amount && <span className="text-red-500 font-semibold text-[13px]">{errors.amount.message}</span>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="currency">Currency</Label>
                                <Controller
                                    control={control}
                                    name="currency"
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
                                {errors.currency && <span className="text-red-500 font-semibold text-[13px]">{errors.currency.message}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="convertedAmount">Converted Amount</Label>
                                <Input
                                    id="convertedAmount"
                                    type="number"
                                    {...register("convertedAmount", { required: "Converted amount is required" })}
                                />
                                {errors.convertedAmount && (
                                    <span className="text-red-500 font-semibold text-[13px]">{errors.convertedAmount.message}</span>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">Category</Label>
                                <Input id="category" {...register("category", { required: "Category is required" })} />
                                {errors.category && <span className="text-red-500 font-semibold text-[13px]">{errors.category.message}</span>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea id="notes" rows={1} maxLength={200} {...register("notes")} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="date">Date</Label>
                            <Controller
                                control={control}
                                name="date"
                                render={({ field }) => (
                                    <DatePicker date={field.value} setDate={field.onChange} />
                                )}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
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
