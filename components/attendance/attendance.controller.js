import Attendance from "./attendance.model.js";

export const markAttendance = async (req, res) => {
    const { student, term } = req.body
    const attendance = await Attendance.findOne({ student, term })
    // reminder to come back and implement logic that won't allow attendance to be marked twice in a day
    attendance.mark = attendance.mark += 1
    attendance.save()
}
