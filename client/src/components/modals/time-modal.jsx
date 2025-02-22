"use client"

import { MODAL_TYPE, useModal } from "@/hooks/useModalStore"
import { useState, useEffect, useContext } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SunnahContext } from "@/context/sunnahContext"
import { useUpdateDikr } from "@/hooks/Istighfar/useUpdateDikr"
import { useAuthUser } from "@/hooks/jwt/useAuthUser"

export default function TimeModal() {
    const userInfo = useAuthUser();

    const updateDikr = useUpdateDikr()
    const { dikr, setDikr } = useContext(SunnahContext) || {}
    const { isOpen, onClose, type } = useModal()
    const isModalOpen = isOpen && type === MODAL_TYPE.SUNNAH_REMINDER
    
    // Create initial state based on dikr settings or defaults
    const [reminderSettings, setReminderSettings] = useState({
        startTime: "00:00",
        endTime: "00:00",
        interval: 60,
    })
    
    const [displayTimes, setDisplayTimes] = useState({
        startTimeDisplay: "",
        endTimeDisplay: "",
    })

    // Update the state when dikr changes or modal opens
    useEffect(() => {
        if (isModalOpen && dikr?.dikr) {
            setReminderSettings({
                startTime: dikr.dikr.startTime || "00:00",
                endTime: dikr.dikr.endTime || "00:00",
                interval: dikr.dikr.interval || 60,
            })
        }
    }, [dikr, isModalOpen]) // Added isModalOpen to the dependency array
    
    // Convert 24-hour format to 12-hour format with Arabic AM/PM
    const formatTimeDisplay = (time24) => {
        if (!time24) return ""
        const [hours, minutes] = time24.split(":")
        const hour = parseInt(hours, 10)
        const ampm = hour >= 12 ? "م" : "ص"
        const hour12 = hour % 12 || 12
        return `${hour12}:${minutes} ${ampm}`
    }

    // Update display times when actual times change
    useEffect(() => {
        setDisplayTimes({
            startTimeDisplay: formatTimeDisplay(reminderSettings.startTime),
            endTimeDisplay: formatTimeDisplay(reminderSettings.endTime),
        })
    }, [reminderSettings.startTime, reminderSettings.endTime])

    const handleTimeChange = (field, value) => {
        setReminderSettings((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        console.log("Saving settings:", reminderSettings)
        
        // Update the dikr in context with new settings
        if (dikr && setDikr) {
            const updatedDikr = {
                ...dikr,
                dikr: {
                    ...dikr.dikr,
                    startTime: reminderSettings.startTime,
                    endTime: reminderSettings.endTime,
                    interval: reminderSettings.interval
                }
            }
            setDikr(updatedDikr)
            // Create the object to send to the backend
            const data = {
                userId: userInfo.userId, // Assuming userId is stored in dikr object
                index: dikr.index,   // Assuming dikr index is stored in dikr object
                startTime: reminderSettings.startTime,
                endTime: reminderSettings.endTime,
                interval: reminderSettings.interval
            };
            updateDikr.mutate(data)
        }
        
        onClose()
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black text-white border-gray-800 max-w-sm" dir="rtl">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-center">إعدادات التنبيه</DialogTitle>
                </DialogHeader>
                <div className="space-y-8 py-4">
                    {/* Start Time */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg">وقت بداية التنبيه</Label>
                        </div>
                        <div className="relative">
                            <div
                                className="bg-zinc-900 border border-gray-800 rounded-md text-center py-6 text-xl cursor-pointer text-emerald-500"
                                onClick={() => document.getElementById("startTime")?.showPicker()}
                            >
                                {displayTimes.startTimeDisplay || "اختر الوقت"}
                            </div>
                            <Input
                                id="startTime"
                                type="time"
                                value={reminderSettings.startTime}
                                onChange={(e) => handleTimeChange("startTime", e.target.value)}
                                className="sr-only"
                            />
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-lg">وقت نهاية التنبيه</Label>
                        </div>
                        <div className="relative">
                            <div
                                className="bg-zinc-900 border border-gray-800 rounded-md text-center py-6 text-xl cursor-pointer text-emerald-500"
                                onClick={() => document.getElementById("endTime")?.showPicker()}
                            >
                                {displayTimes.endTimeDisplay || "اختر الوقت"}
                            </div>
                            <Input
                                id="endTime"
                                type="time"
                                value={reminderSettings.endTime}
                                onChange={(e) => handleTimeChange("endTime", e.target.value)}
                                className="sr-only"
                            />
                        </div>
                    </div>

                    {/* Interval Selection */}
                    <div className="space-y-4">
                        <Label className="text-lg block text-center">تكرار التنبيه كل</Label>
                        <RadioGroup
                            value={reminderSettings.interval ? reminderSettings.interval.toString() : "60"}
                            onValueChange={(value) => setReminderSettings((prev) => ({ ...prev, interval: parseInt(value, 10) }))}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-center justify-between bg-zinc-900 rounded-md px-4 py-3">
                                <RadioGroupItem value="30" id="thirty" className="text-emerald-500" />
                                <Label htmlFor="thirty" className="pr-3 text-lg">
                                    ثلاثون دقيقة
                                </Label>
                            </div>
                            <div className="flex items-center justify-between bg-zinc-900 rounded-md px-4 py-3">
                                <RadioGroupItem value="60" id="hour" className="text-emerald-500" />
                                <Label htmlFor="hour" className="pr-3 text-lg">
                                    ساعة
                                </Label>
                            </div>
                            <div className="flex items-center justify-between bg-zinc-900 rounded-md px-4 py-3">
                                <RadioGroupItem value="120" id="two_hours" className="text-emerald-500" />
                                <Label htmlFor="two_hours" className="pr-3 text-lg">
                                    ساعتين
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outline"
                            className="flex-1 text-lg bg-emerald-600 hover:bg-emerald-700 border-0 text-white"
                            onClick={onClose}
                        >
                            إلغاء
                        </Button>
                        <Button className="flex-1 text-lg bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleSave}>
                            حفظ
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}