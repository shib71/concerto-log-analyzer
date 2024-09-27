import { NominationID, StudentID } from "./types"

export const findStudentQuery = (nominationID: NominationID) => `
SELECT      student
FROM        APIStudentNomination
WHERE       id = ${nominationID};
`

export const findNominationsQuery = (studentID: StudentID) => `
SELECT      n.id, n.student, n.pin, n.expiryDate, n.lastSuccessfulLogin, n.phase,
            n.testGroup_id, n.selectFrom, g.title, g.startDate, g.endDate
FROM        APIStudentNomination n
            INNER JOIN APITestGroup g ON n.testGroup_id=g.id
WHERE       n.student=${studentID}
ORDER BY    n.lastSuccessfulLogin DESC;
`

export const findSessionsQuery = (nominationID: NominationID) => `
SELECT      *
FROM        APITestSession
WHERE       nomination_id=${nominationID}
ORDER BY    id DESC;
`
