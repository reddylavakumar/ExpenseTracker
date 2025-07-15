import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/reusablecomponents/Datepicker";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { format, parse } from "date-fns";
import useExpenseStore from "@/store/useAppStore";
import { getExpenseById } from "@/services/api/expenseApi";
import { toast } from "sonner";
import { useAddExpense, useUpdateExpense } from "@/services/hooks/useExpenses";
// import { useAddExpense, useUpdateExpense } from "@/hooks/useExpenses";

interface DialogBoxProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id?: string;
}

type ExpenseFormData = {
    title: string;
    amount: string;
    currency: string;
    convertedAmount: string;
    category: string;
    notes: string;
    date: Date;
    image?: FileList;
};

export function ExpenseDialogBox({ open, onOpenChange, id }: DialogBoxProps) {
    const { settings } = useExpenseStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch,
        setValue,
    } = useForm<ExpenseFormData>({
        defaultValues: {
            currency: settings?.currency ?? "",
            date: new Date(),
        },
    });

    const watchImage = watch("image");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const addExpenseMutation = useAddExpense();
    const updateExpenseMutation = useUpdateExpense();

    useEffect(() => {
        if (id && open) {
            setLoading(true);
            getExpenseById(id)
                .then((data) => {
                    const parsedDate = parse(data.date, "dd-MM-yyyy", new Date());
                    setValue("title", data.title);
                    setValue("amount", data.amount);
                    setValue("currency", data.currency);
                    setValue("convertedAmount", data.convertedAmount);
                    setValue("category", data.category);
                    setValue("notes", data.notes);
                    setValue("date", parsedDate);
                    setImagePreview(data.image_src);
                })
                .catch((err) => {
                    console.error("Failed to fetch expense data", err);
                })
                .finally(() => setLoading(false));
        } else {
            reset();
            setImagePreview(null);
        }
    }, [id, open, reset, setValue]);

    useEffect(() => {
        const file = watchImage?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, [watchImage]);

    const handleFormSubmit = async (data: ExpenseFormData) => {
        const expenseDate = new Date(data.date);
        if (isNaN(expenseDate.getTime())) {
            toast.error("Invalid date");
            return;
        }

        const formattedData = {
            id: id ?? uuidv4(),
            title: data.title,
            amount: data.amount,
            currency: data.currency,
            convertedAmount: data.convertedAmount,
            isIncome: false,
            category: data.category,
            notes: data.notes,
            date: format(expenseDate, "dd-MM-yyyy"),
            createdAt: id ? undefined : format(new Date(), "dd-MM-yyyy"),
            image_src:
                imagePreview ??
                "https://img.freepik.com/free-photo/large-mixed-pizza-with-meat_140725-1274.jpg?semt=ais_hybrid&w=740",
        };

        try {
            if (id) {
                await updateExpenseMutation.mutateAsync({ id, data: formattedData });
                toast.success("Expense updated successfully");
            } else {
                await addExpenseMutation.mutateAsync(formattedData);
                toast.success("Expense added successfully");
            }

            reset();
            setImagePreview(null);
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to save expense:", error);
            toast.error("Something went wrong while saving the expense.");
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                onOpenChange(state);
                if (!state) {
                    reset();
                    setImagePreview(null);
                }
            }}
        >
            <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                    <DialogTitle>{id ? "Edit Expense" : "Add Expense"}</DialogTitle>
                    <DialogDescription>
                        {id
                            ? "Update the details to modify the expense."
                            : "Fill in the details to record a new Expense."}
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="p-4 text-center">Loading...</div>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(handleFormSubmit)(e);
                        }}
                        className="space-y-4"
                    >
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="title">Spent on</Label>
                                    <Input
                                        id="title"
                                        {...register("title", { required: "Title is required" })}
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm">
                                            {errors.title.message}
                                        </span>
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
                                            min: { value: 1, message: "Amount must be at least 1" },
                                        })}
                                    />
                                    {errors.amount && (
                                        <span className="text-red-500 text-sm">
                                            {errors.amount.message}
                                        </span>
                                    )}
                                </div>
                            </div>

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
                                                    <SelectItem value="DOLLAR">USD</SelectItem>
                                                    <SelectItem value="EUR">EUR</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    {errors.currency && (
                                        <span className="text-red-500 text-sm">
                                            {errors.currency.message}
                                        </span>
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

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input
                                        id="category"
                                        {...register("category", { required: "Category is required" })}
                                    />
                                    {errors.category && (
                                        <span className="text-red-500 text-sm">
                                            {errors.category.message}
                                        </span>
                                    )}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Textarea id="notes" rows={1} maxLength={200} {...register("notes")} />
                                </div>
                            </div>

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

                            <div className="grid gap-2">
                                <Label htmlFor="image">Upload Image</Label>
                                <Input id="image" type="file" accept="image/*" {...register("image")} />
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
                                <Button type="button" variant="outline" onClick={() => {
                                    reset();
                                    setImagePreview(null);
                                    onOpenChange(false);
                                }}>
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button type="submit">{id ? "Update" : "Save changes"}</Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
