'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Grid from "@/app/sheet/[sheetId]/Grid";

const Editor = () => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: <Grid />,
    })

    return (
        <div>
            
      <Grid/>
        </div>
    )
}

export default Editor
