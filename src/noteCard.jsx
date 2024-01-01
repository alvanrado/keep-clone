export function NoteCard ({title, note}) {
    return (
        <section className="keep-note-card">
            <h1 className="keep-note-card--title">{title}</h1>
            <p className="keep-note-card--note">{note}</p>
        </section>
    )
}