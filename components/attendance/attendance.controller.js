import Attendance from "./attendance.model.js";
import { isToday } from "../../utils/time.js";
import { BadRequestError, NotFoundError } from "../../utils/errors.js";
import { getActiveTerm } from "../../utils/active-term.js";

export const markAttendance = async (req, res) => {
  const { student, isPresent } = req.body;
  const { classroom } = req.user;
  const { dateLastOpened, _id: term } = await getActiveTerm();
  if (!isToday(dateLastOpened)) {
    throw new BadRequestError("School has not been marked open today.");
  }
  const existingAttendance = await Attendance.findOne({
    student,
    term,
    classroom,
  });
  const attendance =
    existingAttendance ||
    (await Attendance.create({ student, term, classroom }));
  if (isToday(attendance.dateLastMarked)) {
    throw new BadRequestError(
      "Attendance already marked today for this student"
    );
  }
  const attendanceMark = attendance.mark;
  attendance.mark = isPresent ? attendanceMark + 1 : attendanceMark;
  attendance.dateLastMarked = new Date();
  await attendance.save();
  res.status(200).json({ message: "Student marked present" });
};
