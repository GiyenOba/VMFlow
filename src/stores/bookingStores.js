import { defineStore } from "pinia";

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookings: [],
        nextBookingId:1,
    }),

    actions: {
        hasBookingConflict(vmId, startAt, endAt){
            const newStart = new Date(startAt)
            const newEnd = new Date(endAt)
            return this.bookings.some((booking) =>{
                if (booking.vmId !== vmId){
                    return  false
                }
                if(booking.status !== 'confiremd'){
                 return false
                }
                
                const existingStart = new Date(booking.startAt)
                const existaingEnd = new Date(booking.endAt)

                return existingStart > newEnd && existaingEnd < newStart
            })
        },
        createBooking ({requester, vmId, startAt, endAt}){
            const numericVmId = Number(vmId)

            const hasConflict = this.hasBookingConflict(
                numericVmId,
                startAt,
                endAt,  
            )
            const booking = {
                id:this.nextBookingId,
                requester: requester.trim(),
                vmId: numericVmId,
                startAt,
                endAt,
                status: hasConflict? 'waitlisted': 'confirmed',
                createdAt: new Date().toString(),
            }
            this.nextBookingId += 1
            this.bookings.push(booking)
            return booking
        },
    },
})