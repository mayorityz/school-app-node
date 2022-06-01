import Attendance from "./attendance.model.js";
import { isToday } from "../../utils/time.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";

export const markAttendance = async (req, res) => {
  const { student, term, isPresent } = req.body;
  const { classroom } = req.user;
  const { dateLastOpened } = req.user.schoolInfo;
  if (!isToday(dateLastOpened)) {
    throw new BadRequestError("School has not been marked open today.");
  }
  const attendance = await Attendance.findOne({ student, term, classroom });
  if (!attendance) {
    throw new NotFoundError("No student in this class for this term");
  }
  if (isToday(attendance.dateLastMarked)) {
    throw new BadRequestError(
      "Attendance already marked today for this student"
    );
  }
  const attendanceMark = attendance.mark;
  attendance.mark = isPresent ? attendanceMark + 1 : attendanceMark;
  attendance.dateLastMarked = new Date();
  await attendance.save();
};
