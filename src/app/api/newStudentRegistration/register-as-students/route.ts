import { NextRequest, NextResponse } from "next/server";
import Students from "../../../../../models/students";
import NewStudentRegistration from "../../../../../models/newStudentRegistration";


export async function POST(req: NextRequest) {
  try {
    const [regData, students, candidates] = await Promise.all([
      req.json() as Promise<string[]>, // assuming regData is an array of IDs
      Students.find(),
      NewStudentRegistration.find(),
    ]);

    for (const id of regData) {
      const candidate = candidates.find((el) => el._id.toString() === id);
      if (!candidate) continue;

      const year = new Date().getFullYear();
      const studentWithSameClass = students.filter(
        (s) => s.current_class === candidate.class
      );

      const nextCount = studentWithSameClass.length + 1;
      const regno = `${candidate.class}${year}${
        nextCount > 9 ? nextCount : `0${nextCount}`
      }`;
      const rollno = nextCount;

      const data = {
        name: candidate.name,
        email: candidate.email,
        current_class: candidate.class,
        address: candidate.address,
        father_name: candidate.father_name,
        mother_name: candidate.mother_name,
        gender: candidate.gender,
        phone: candidate.phone,
        monthly_fees: 4000,
        registration_fees: 10000,
        markSheet: candidate.marksSheet,
      };

      await Promise.all([
        Students.create({ regno, rollno, ...data }),
        NewStudentRegistration.findByIdAndDelete(id),
      ]);
    }

    return NextResponse.json(
      { message: "The candidate(s) have been registered as student(s)." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in student registration:", error);
    return NextResponse.json(
      { message: "An error occurred while registering candidates." },
      { status: 500 }
    );
  }
}
