import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from '~/renderer/pages/Settings'
import '~/renderer/styles/index.css'

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)
root.render(<Root />)
