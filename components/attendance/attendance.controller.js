import Attendance from "./attendance.model.js";
import Term from "../terms/term.model.js";
import { isToday } from "../../utils/time.js";
import { BadRequestError } from "../../utils/errors.js";

export const markAttendance = async (req, res) => {
    const { student, term, isPresent } = req.body
    const currentTerm = await Term.findById(term)
    if (!isToday(currentTerm.dateLastOpened)) {
        throw new BadRequestError("School has not been marked open today.")
    }
    const attendance = await Attendance.findOne({ student, term })
    if (!isToday(attendance.dateLastMarked)) {
        throw new BadRequestError("Attendance already marked today for this student")
    }
    const attendanceMark = attendance.mark
    attendance.mark = isPresent ? attendanceMark + 1 : attendanceMark
    attendance.dateLastMarked = new Date()
    await attendance.save()
}
