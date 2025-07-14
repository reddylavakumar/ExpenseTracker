'use client';
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";


import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useExpenseStore from "@/store/useAppStore";
import { toast } from "sonner";

interface DialogBoxProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type SettingsFormData = {
    currency: string;
    budgetLimit?: string;
};

export function SettingsDialogBox({ open, onOpenChange }: DialogBoxProps) {
    const { settings, updateSettings } = useExpenseStore();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<SettingsFormData>({
        defaultValues: settings,
    });

    useEffect(() => {
        if (open) {
            reset(settings);
        }
    }, [open, settings, reset]);

    const handleSettingsSubmit = (data: SettingsFormData) => {
        updateSettings(data);
        onOpenChange(false);
        console.log("inside save!!");
        toast.success("Saved successfully !!")
        reset();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(state) => {
                onOpenChange(state);
                if (!state) {
                    reset(settings);
                }
            }}
        >
            <DialogContent className="sm:max-w-[425px] dark:text-white">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Configure your preferences.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleSettingsSubmit)} className="space-y-4">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="currency">Default Currency</Label>
                            <Controller
                                name="currency"
                                control={control}
                                rules={{ required: "Currency is required" }}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="INR">INR</SelectItem>
                                            <SelectItem value="DOLLAR">DOLLAR</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.currency && (
                                <span className="text-red-500 text-sm">{errors.currency.message}</span>
                            )}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="budgetLimit">Monthly Budget Limit</Label>
                            <Input
                                id="budgetLimit"
                                type="number"
                                min={0}
                                placeholder="No limit"
                                {...register("budgetLimit")}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" onClick={() => reset(settings)}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">Save Settings</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
