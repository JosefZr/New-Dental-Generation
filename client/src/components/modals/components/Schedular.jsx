"use client"

import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react"
import { IoCalendarNumber } from "react-icons/io5"
import { createViewWeek, createViewMonthGrid } from "@schedule-x/calendar"
import "@schedule-x/theme-default/dist/calendar.css"

export default function Schedular() {
  const calendar = useCalendarApp({
    views: [createViewWeek(), createViewMonthGrid()],
    events: [
      {
        id: 1,
        title: "Event 1",
        start: "2025-02-01 00:00",
        end: "2025-02-01 02:00",
      },
    ],
    selectedDate: "2025-01-01",
  })
  calendar.setTheme('dark')
  return (
      <div className="h-full w-full rounded-xl bg-next-midnight text-white flex flex-col">
        <div className="container mx-auto px-2 flex-shrink-0">
          <div className="flex flex-row justify-between items-center px-2 py-4">
            <div className="text-xl font-semibold md:block">Daily Schedule</div>

            <button className="btn btn-square btn-md group rounded-md border-none bg-my-gold hover:bg-my-beige text-black">
              <IoCalendarNumber />
            </button>
          </div>
        </div>
        <div className="carousel-item relative h-full w-full overflow-hidden">
      <div className="scrollbar-custom  relative h-full w-full animate-fade-in">
        <div
          className="scrollbar-none overflow-y-scroll h-full w-full"
          style={{
            position: "relative", // Maintain proper positioning
          }}
        >
          <div
            className="h-full max-h-[80vh]  bg-next-midnight rounded-lg  pb-4 "
            style={{backgroundColor:"rgb(6 14 21 )"}}
          ><div className="flex-grow overflow-hidden">
          <div className="w-full h-full overflow-auto">
            <ScheduleXCalendar calendarApp={calendar} className="w-full h-full min-h-[500px] bg-black" />
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
        
  )
}

