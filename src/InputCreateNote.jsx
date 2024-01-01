import { NoteCard } from './NoteCard'
import { useState, useRef, useEffect } from 'react'

const noHasValue = (string) => string.trim().length == 0

export function InputCreateNote() {
    const [textTitle, setTextTitle] = useState('')
    const [textNote, setTextNote] = useState('')

    const [items, setItems] = useState([])

    const newRef = useRef(null)

    const [onFocus, setFocus] = useState(false)
    const inputClassname = onFocus ? 'app-create-note--title' 
    : 'app-create-note--title hidden'

    const getTitle = (e) => setTextTitle(e.target.value)
    const getNote = (e) => setTextNote(e.target.value)
    
    const addNote = (title, note) => {
        const noteAdded = {
            id: Math.floor(Math.random() * 1000),
            title: title,
            note: note
        }
        setItems(notes => [...notes, noteAdded])
    }
    

    const handle = (e) => {
        if (!newRef.current.contains(e.target)) {
            setFocus(current => current = false)
            let noValue = noHasValue(textTitle) && noHasValue(textNote)
            if (!noValue) {
                addNote(textTitle, textNote)
                setTextNote('')
                setTextTitle('')
            }

        } else {
            setFocus(current => current = true)
        }
    } 

    useEffect(() => {
        document.addEventListener("click", handle)
        return () => {
            document.removeEventListener("click", handle)
        }
    })


    return (
        <>
            <article className='app-create-note' ref={newRef}>
                <input type="text" placeholder="Título" className={inputClassname} onChange={getTitle} value={textTitle} />
                <input type="text" placeholder="Añade una nota..." className="app-create-note--note" onClick={handle} onChange={getNote} value={textNote} />
            </article> 

            <article className='app-cards-container'>
                {items.map(item => {
                    return (
                        <NoteCard key={item} title={item.title} note={item.note}/>
                    )
                })}
            </article>
        </>
    )
}