import { NoteData, NoteDataUpdate, NoteDataWithID, NoteDataWithIDList } from "../shared/types"
import { deleteNote, getNote,saveNote,getNoteList,updateNote, updateNotePartially } from "./rest-api"

describe("rest-api", () => {
    it("test-getNoteList", async () => {
      /*  const {response,noteDataList} = await getNoteList(0)
        
        expect(response.ok).toBe(true)
        expect(noteDataList).toBeDefined()
        expect(noteDataList.length).toBeGreaterThan(0)
        */

    })

    it("test-saveNote", async () => {
        const note:NoteData = {title:"title", text:"text", rawText:"", starMarked: false}
        const response = await saveNote(note)
        expect(response.ok).toBe(true)
        
    })

    it("test-getNote", async () => {
        const {note} = await getNote(42)

        expect(note).toBeDefined()
        expect(note).toHaveProperty("id")
        expect(note.id).toBe(42)
    })

    it("test-deleteNote", async () => {
        const unSavedNote:NoteData = {title:"title", text:"text", rawText:"", starMarked: false}
        const initalResponse = await saveNote(unSavedNote)
        
        const savedNote:NoteDataWithID = await initalResponse.json()
        expect(initalResponse.ok).toBe(true)

        const jsonResponse = await deleteNote(savedNote.id)
        expect(jsonResponse.ok).toBe(true)

    })

    it("test-updatePartialNote", async () => {
        const partialNote:NoteDataUpdate = {
            id:28,
            title:"A message from other universe"
        }
        const response = await updateNotePartially(partialNote)
        expect(response.ok).toBe(true)
        const data:NoteDataWithID = await response.json()
        expect(data.title).toEqual(partialNote.title)
    })

    it("test-updateNote", async () => {
        const unSavedNote:NoteData = {title:"title", text:"text", rawText:"", starMarked: false}
        const initalResponse = await saveNote(unSavedNote)
        expect(initalResponse.ok).toBe(true)
        
        const savedNote:NoteDataWithID = await initalResponse.json()
        savedNote.text = "new text"
         
        const secondResponse  = await updateNote(savedNote)
        expect(secondResponse.ok).toBe(true)
        const {note:retrivedNote} = await getNote(savedNote.id)

        expect(retrivedNote.text).toBe(savedNote.text)
        expect(retrivedNote.title).toBe(savedNote.title)
        expect(retrivedNote.id).toBe(savedNote.id)
    })
})
export {}